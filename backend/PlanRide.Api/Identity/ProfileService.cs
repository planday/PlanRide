using System.Security.Claims;
using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.EntityFrameworkCore;
using PlanRide.Infrastructure.EntityFramework;

namespace PlanRide.Api.Services;

public class ProfileService : IProfileService
{
    private readonly PlanRideDb _PlanRideDb;

    public ProfileService(PlanRideDb planRideDb)
    {
        _PlanRideDb = planRideDb;
    }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var sub = context.Subject.GetSubjectId();
        var user = await _PlanRideDb.Users.SingleOrDefaultAsync(x => x.Id == Guid.Parse(sub));
        if (user == null || !user.IsActive)
        {
            throw new ArgumentException("User not found or inactive");
        }

        var claims = context.IssuedClaims;
        claims.Add(new Claim(JwtClaimTypes.Name, $"{user.FirstName} {user.LastName}"));
        claims.Add(new Claim(JwtClaimTypes.Email, user.Email));
    }

    public async Task IsActiveAsync(IsActiveContext context)
    {
        var sub = context.Subject.GetSubjectId();
        var user = await _PlanRideDb.Users.SingleOrDefaultAsync(x => x.Id == Guid.Parse(sub));
        context.IsActive = user is { IsActive: true };
    }
}