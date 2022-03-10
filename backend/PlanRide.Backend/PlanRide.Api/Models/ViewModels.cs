using PlanRide.Infrastructure.EntityFramework;

namespace PlanRide.Api.Models;

public record RegionViewModel(long Id, string Name);

public record CountryViewModel(string CountryCode, string Name);

public record LocationViewModel(long Id, string Name, string CountryCode, long RegionId, string RegionName);

public class UserViewModel
{
    public UserViewModel(UserAccount user)
    {
        Id = user.Id;
    }
    public Guid Id { get; set; }
}