using IdentityServer4.Models;

namespace PlanRide.Api.Models.Login;

public record ErrorViewModel
{
    public string RequestId { get; init; }
    public string WebAppUrl { get; init; }
    public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    public ErrorMessage Error { get; init; }
}