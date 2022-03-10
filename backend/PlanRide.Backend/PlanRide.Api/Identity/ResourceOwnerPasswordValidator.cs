using System.Security.Claims;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using Microsoft.EntityFrameworkCore;
using PlanRide.Infrastructure;
using PlanRide.Infrastructure.EntityFramework;

namespace PlanRide.Api.Identity;

public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
{
    private readonly PlanRideDb _planRideDb;
    private readonly ISecurePassword _securePassword;

    private const string ERR_MESSAGE = "User not found, locked, or invalid credentials provided.";

    public ResourceOwnerPasswordValidator(PlanRideDb planRideDb, ISecurePassword securePassword)
    {
        _planRideDb = planRideDb;
        _securePassword = securePassword;
    }

    public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
    {
        var userNamePrepared = context.UserName?.Trim().ToLower();
        var user = await _planRideDb.Users.SingleOrDefaultAsync(x => x.Email == userNamePrepared);
        if (user == null || !user.IsActive)
        {
            context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, ERR_MESSAGE);
            return;
        }

        if (!await _securePassword.Validate(context.Password, user.PasswordHash, user.PasswordSalt))
        {
            context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, ERR_MESSAGE);
            return;
        }

        context.Result = new GrantValidationResult(subject: user.Email,
            authenticationMethod: "password",
            claims: new Claim[] {
                new Claim(ClaimTypes.NameIdentifier, user.Email),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
            });
    }
}