namespace PlanRide.Api.Models.Login;

public record ExternalProvider
{
    public string DisplayName { get; init; }
    public string AuthenticationScheme { get; init; }
}