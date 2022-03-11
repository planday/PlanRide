using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReConnect.Accommodation.Api.Models;
using ReConnect.Accommodation.Api.Models.Offers;
using ReConnect.Accommodation.Api.Models.Requests;

namespace ReConnect.Accommodation.Api.Controllers;

/// <summary>
/// Provides functionality for hosts to manage accommodation offers
/// </summary>
[ApiController]
[Route("host")]
public class HostController : ControllerBase
{
    /// <summary>
    /// List requests for the current user's accommodation offers
    /// </summary>
    /// <returns></returns>
    [HttpGet("requests", Name = "ListHostRequests")]
    [Authorize]
    [ProducesResponseType(typeof(IEnumerable<RequestViewModel>), 200)]
    public async Task<IEnumerable<RequestViewModel>> ListHostRequests()
    {
        return Array.Empty<RequestViewModel>();
    }

    /// <summary>
    /// Change request status for an accommodation request
    /// </summary>
    /// <returns></returns>
    [HttpPut("requests/{requestId:guid}", Name = "SetAccommodationRequestStatus")]
    [Authorize]
    [ProducesResponseType(204)]
    [Consumes("application/json")]
    public async Task<IActionResult> SetRequestStatus(
        [FromBody] SetRequestStatusInputModel model)
    {
        return NoContent();
    }
    
    /// <summary>
    /// Get contact details of an approved accommodation request
    /// </summary>
    /// <param name="requestId"></param>
    /// <returns></returns>
    [HttpGet("requests/{requestId:guid}/contacts", Name = "GetRequestContactDetails")]
    [Authorize]
    [ProducesResponseType(typeof(ContactPersonViewModel), 200)]
    public async Task<ContactPersonViewModel> GetRequestContactDetails()
    {
        return null;
    }

    /// <summary>
    /// List current user's accommodation offers
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpGet("offers", Name = "ListOffers")]
    [Authorize]
    [ProducesResponseType(typeof(IEnumerable<OfferViewModel>), 200)]
    public async Task<IEnumerable<OfferViewModel>> ListOffers(
        [FromBody] OfferInputModel model)
    {
        return Array.Empty<OfferViewModel>();
    }

    /// <summary>
    /// Get current user's accommodation offer details
    /// </summary>
    /// <param name="offerId"></param>
    /// <returns></returns>
    [HttpGet("offers/{offerId:guid}", Name = "GetOffer")]
    [Authorize]
    [ProducesResponseType(typeof(OfferDetailsViewModel), 200)]
    public async Task<OfferDetailsViewModel> GetOffer([FromRoute] Guid offerId)
    {
        return null;
    }

    /// <summary>
    /// Create new accommodation offer
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpPost("offers", Name = "CreateOffer")]
    [Authorize]
    [Consumes("application/json")]
    public async Task<IActionResult> CreateOffer([FromBody] OfferInputModel model)
    {
        var userId = Guid.Parse(User.Claims.First(x => x.Type == "sub").Value);
        return Ok(new { Id = Guid.NewGuid() });
    }

    /// <summary>
    /// Delete accommodation offer
    /// </summary>
    /// <param name="offerId">ID of the accommodation offer to delete.</param>
    /// <returns></returns>
    [HttpDelete("offers/{offerId:guid}", Name = "DeleteOffer")]
    [Authorize]
    [Consumes("application/json")]
    public async Task<IActionResult> DeleteOffer([FromRoute] Guid offerId)
    {
        var userId = Guid.Parse(User.Claims.First(x => x.Type == "sub").Value);
        return NoContent();
    }
}