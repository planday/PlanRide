using System.ComponentModel.DataAnnotations;

namespace PlanRide.Api.Models.Login;
public record LoginInputModel
{
    [Required]
    public string Username { get; init; }
    [Required]
    public string Password { get; init; }
    public bool RememberLogin { get; init; }
    public string ReturnUrl { get; init; }
}

public record LoginViewModel : LoginInputModel
{
    public bool AllowRememberLogin { get; init; } = true;
    public bool EnableLocalLogin { get; init; } = true;

    public IEnumerable<ExternalProvider> ExternalProviders { get; init; } = Enumerable.Empty<ExternalProvider>();
    public IEnumerable<ExternalProvider> VisibleExternalProviders => ExternalProviders.Where(x => !String.IsNullOrWhiteSpace(x.DisplayName));

    public bool IsExternalLoginOnly => EnableLocalLogin == false && ExternalProviders?.Count() == 1;
    public string ExternalLoginScheme => IsExternalLoginOnly ? ExternalProviders?.SingleOrDefault()?.AuthenticationScheme : null;
        
    public string WebAppUrl { get; init; }
}