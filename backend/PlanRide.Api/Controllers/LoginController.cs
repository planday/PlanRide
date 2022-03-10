using IdentityServer4;
using IdentityServer4.Events;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlanRide.Api.Identity;
using PlanRide.Api.Models.Login;
using PlanRide.Infrastructure;
using PlanRide.Infrastructure.EntityFramework;

namespace PlanRide.Api.Controllers;

[SecurityHeaders]
[AllowAnonymous]
[Route("account/login")]
public class LoginController : Controller
{
    private readonly IIdentityServerInteractionService _interaction;
    private readonly IClientStore _clientStore;
    private readonly IAuthenticationSchemeProvider _schemeProvider;
    private readonly IEventService _events;
    private readonly ISecurePassword _securePassword;
    private readonly IConfiguration _configuration;
    private readonly PlanRideDb _planRideDb;

    public LoginController(IIdentityServerInteractionService interaction, IClientStore clientStore,
        IAuthenticationSchemeProvider schemeProvider, IEventService events, ISecurePassword securePassword,
        IConfiguration configuration, PlanRideDb planRideDb)
    {
        _interaction = interaction;
        _clientStore = clientStore;
        _schemeProvider = schemeProvider;
        _events = events;
        _securePassword = securePassword;
        _configuration = configuration;
        _planRideDb = planRideDb;
    }

    [HttpGet]
    public async Task<IActionResult> Login(string returnUrl)
    {
        // build a model so we know what to show on the login page
        var vm = await BuildLoginViewModelAsync(returnUrl);

        if (vm.IsExternalLoginOnly)
        {
            // we only have one option for logging in and it's an external provider
            return RedirectToAction("Challenge", "External", new { provider = vm.ExternalLoginScheme, returnUrl });
        }

        ViewData["Title"] = "Planride Login";
        return View(vm);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginInputModel model, string button)
    {
        // check if we are in the context of an authorization request
        var context = await _interaction.GetAuthorizationContextAsync(model.ReturnUrl);

        // the user clicked the "cancel" button
        if (button != "login")
        {
            if (context != null)
            {
                // if the user cancels, send a result back into IdentityServer as if they 
                // denied the consent (even if this client does not require consent).
                // this will send back an access denied OIDC error response to the client.
                await _interaction.GrantConsentAsync(context,
                    new ConsentResponse() { Error = new AuthorizationError(), ErrorDescription = "Denied" });

                // we can trust model.ReturnUrl since GetAuthorizationContextAsync returned non-null
                if (await _clientStore.IsPkceClientAsync(context.Client.ClientId))
                {
                    // if the client is PKCE then we assume it's native, so this change in how to
                    // return the response is for better UX for the end user.
                    return View("Redirect", new RedirectViewModel { RedirectUrl = model.ReturnUrl });
                }

                return Redirect(model.ReturnUrl);
            }
            else
            {
                // since we don't have a valid context, then we just go back to the home page
                return Redirect("~/");
            }
        }

        if (ModelState.IsValid)
        {
            var userNamePrepared = model.Username?.Trim().ToLower();
            var userAccount = await _planRideDb.Users.SingleOrDefaultAsync(x => x.Email == userNamePrepared);

            if (userAccount !=null && userAccount.IsActive && await _securePassword.Validate(model.Password,
                    userAccount.PasswordHash, userAccount.PasswordSalt))
            {
                await _events.RaiseAsync(new UserLoginSuccessEvent(userAccount.Email, userAccount.Id.ToString(),
                    $"{userAccount.FirstName} {userAccount.LastName}"));

                // only set explicit expiration here if user chooses "remember me". 
                // otherwise we rely upon expiration configured in cookie middleware.
                AuthenticationProperties props = null;
                if (AccountOptions.AllowRememberLogin && model.RememberLogin)
                {
                    props = new AuthenticationProperties
                    {
                        IsPersistent = true,
                        ExpiresUtc = DateTimeOffset.UtcNow.Add(AccountOptions.RememberMeLoginDuration)
                    };
                }

                // issue authentication cookie with subject ID and username
                var identityUser =
                    new IdentityServerUser(userAccount.Id.ToString()) { DisplayName = userAccount.Email };
                await HttpContext.SignInAsync(identityUser, props);

                if (context != null)
                {
                    if (await _clientStore.IsPkceClientAsync(context.Client.ClientId))
                    {
                        // if the client is PKCE then we assume it's native, so this change in how to
                        // return the response is for better UX for the end user.
                        return View("Redirect", new RedirectViewModel { RedirectUrl = model.ReturnUrl });
                    }

                    // we can trust model.ReturnUrl since GetAuthorizationContextAsync returned non-null
                    return Redirect(model.ReturnUrl);
                }

                // request for a local page
                if (Url.IsLocalUrl(model.ReturnUrl))
                {
                    return Redirect(model.ReturnUrl);
                }
                else if (string.IsNullOrEmpty(model.ReturnUrl))
                {
                    return Redirect("~/");
                }
                else
                {
                    // user might have clicked on a malicious link - should be logged
                    throw new Exception("invalid return URL");
                }
            }

            await _events.RaiseAsync(new UserLoginFailureEvent(model.Username, "invalid credentials"));
            ModelState.AddModelError(string.Empty, AccountOptions.InvalidCredentialsErrorMessage);
        }

        // something went wrong, show form with error
        var vm = await BuildLoginViewModelAsync(model);
        return View(vm);
    }

    private async Task<LoginViewModel> BuildLoginViewModelAsync(string returnUrl)
    {
        var context = await _interaction.GetAuthorizationContextAsync(returnUrl);
        if (context?.IdP != null)
        {
            var local = context.IdP == IdentityServer4.IdentityServerConstants.LocalIdentityProvider;

            // this is meant to short circuit the UI and only trigger the one external IdP
            var vm = new LoginViewModel
            {
                EnableLocalLogin = local,
                ReturnUrl = returnUrl,
                Username = context?.LoginHint,
                WebAppUrl = _configuration["WebAppUrl"]
            };

            if (!local)
            {
                vm = vm with
                {
                    ExternalProviders =
                    new[] { new ExternalProvider { AuthenticationScheme = context.IdP } }
                };
            }

            return vm;
        }

        var schemes = await _schemeProvider.GetAllSchemesAsync();

        var providers = schemes
            .Where(x => x.DisplayName != null ||
                        (x.Name.Equals(AccountOptions.WindowsAuthenticationSchemeName,
                            StringComparison.OrdinalIgnoreCase))
            )
            .Select(x => new ExternalProvider { DisplayName = x.DisplayName, AuthenticationScheme = x.Name })
            .ToList();

        var allowLocal = true;
        if (context?.Client.ClientId != null)
        {
            var client = await _clientStore.FindEnabledClientByIdAsync(context.Client.ClientId);
            if (client != null)
            {
                allowLocal = client.EnableLocalLogin;

                if (client.IdentityProviderRestrictions != null && client.IdentityProviderRestrictions.Any())
                {
                    providers = providers.Where(provider =>
                        client.IdentityProviderRestrictions.Contains(provider.AuthenticationScheme)).ToList();
                }
            }
        }

        return new LoginViewModel
        {
            AllowRememberLogin = AccountOptions.AllowRememberLogin,
            EnableLocalLogin = allowLocal && AccountOptions.AllowLocalLogin,
            ReturnUrl = returnUrl,
            Username = context?.LoginHint,
            ExternalProviders = providers.ToArray(),
            WebAppUrl = _configuration["WebAppUrl"]
        };
    }

    private async Task<LoginViewModel> BuildLoginViewModelAsync(LoginInputModel model)
    {
        var vm = await BuildLoginViewModelAsync(model.ReturnUrl);
        vm = vm with
        {
            Username = model.Username,
            RememberLogin = model.RememberLogin
        };
        return vm;
    }
}