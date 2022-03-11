using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReConnect.Accommodation.Api.Models.Offers;

namespace ReConnect.Accommodation.Api.Controllers;

[ApiController]
[AllowAnonymous]
[Route("search")]
public class SearchController : ControllerBase
{
    /// <summary>
    /// Search for available accommodation offers matching the filter parameters.
    /// </summary>
    /// <param name="filter"></param>
    /// <returns></returns>
    [HttpPost(Name = "SearchOffers")]
    [Consumes("application/json")]
    public async Task<IEnumerable<OfferViewModel>> SearchOffers([FromBody] SearchFilter filter)
    {
        return Array.Empty<OfferViewModel>();
    }
    
    [HttpGet("{offerId:guid}", Name = "GetOfferDetails")]
    [Produces(typeof(OfferDetailsViewModel))]
    public async Task<IActionResult> GetOfferDetails([FromRoute] Guid offerId)
    {
        return Ok(null as OfferDetailsViewModel);
    }
}