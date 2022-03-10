using IdentityServer4;
using IdentityServer4.Models;

namespace PlanRide.Api.Identity;

public class Config
{
    public static IEnumerable<IdentityResource> GetIdentityResources()
    {
        return new List<IdentityResource> { new IdentityResources.OpenId(), new IdentityResources.Profile(), };
    }

    public static IEnumerable<ApiScope> GetApiScopes()
    {
        return new List<ApiScope>
        {
            new ApiScope(name: "planride-api", displayName: "Accessing Planride API."),
        };
    }

    public static IEnumerable<ApiResource> GetApis()
    {
        return new List<ApiResource>
        {
            new ApiResource("planride-api", "Planride API")
            {
                Scopes = new List<string> { "planride-api" }
            }
        };
    }

    public static IEnumerable<Client> GetClients(IReadOnlyList<string> serviceUriList)
    {
        return new List<Client>
        {
            new Client
            {
                ClientId = "482cd04d-5783-445a-8f79-a794a7142ba7",
                ClientName = "Planride WebApp",
                AllowedGrantTypes = GrantTypes.Code,
                RequirePkce = false,
                RequireClientSecret = false,
                AllowOfflineAccess = true,
                RedirectUris
                    = new List<string>(serviceUriList.SelectMany(x => new List<string>
                    {
                        x,
                        $"{x}/account/login-callback",
                        $"{x}/authentication/callback",
                        $"{x}/authentication/silent_callback",
                        $"{x}/account/login-silent-renew",
                        $"{x}/swagger/oauth2-redirect.html"
                    }))
                    {
                        "http://localhost:3000/account/login-callback",
                        "http://localhost:3000/authentication/callback",
                        "http://localhost:3000/authentication/silent_callback",
                        "http://localhost:3000/account/login-silent-renew",
                        "http://localhost:5297/swagger/oauth2-redirect.html"
                    },
                PostLogoutRedirectUris
                    = new List<string>(serviceUriList.SelectMany(x => new List<string> { x, $"{x}/index.html" }))
                    {
                        "http://localhost:3000/index.html"
                    },
                AllowedCorsOrigins =
                    new List<string>(serviceUriList) { "http://localhost:3000" },
                AllowedScopes =
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "planride-api"
                },
                AllowAccessTokensViaBrowser = true,
                RequireConsent = false
            }
        };
    }
}