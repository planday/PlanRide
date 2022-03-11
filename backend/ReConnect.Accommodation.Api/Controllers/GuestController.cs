using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReConnect.Accommodation.Api.Models;
using ReConnect.Accommodation.Api.Models.Offers;
using ReConnect.Accommodation.Api.Models.Requests;

namespace ReConnect.Accommodation.Api.Controllers;

/// <summary>
/// Provides functionality for guests to manage accommodation requests
/// </summary>
[ApiController]
[Route("guest")]
public class GuestController : ControllerBase
{
    /// <summary>
    /// List current user's accommodation requests
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpGet("requests", Name = "ListRequests")]
    [Authorize]
    [ProducesResponseType(typeof(IEnumerable<RequestViewModel>), 200)]
    public async Task<IEnumerable<RequestViewModel>> ListRequests(
        [FromBody] RequestInputModel model)
    {
        return Array.Empty<RequestViewModel>();
    }

    /// <summary>
    /// Get contact details of the offer that is connected with
    /// an approved accommodation request
    /// </summary>
    /// <param name="requestId"></param>
    /// <returns></returns>
    [HttpGet("requests/{requestId:guid}/contacts", Name = "GetRequestOfferContactDetails")]
    [Authorize]
    [ProducesResponseType(typeof(ContactPersonViewModel), 200)]
    public async Task<ContactPersonViewModel> GetRequestOfferContactDetails([FromRoute] Guid requestId)
    {
        return null;
    }

    /// <summary>
    /// Create new accommodation request
    /// </summary>
    /// <param name="model"></param>
    /// <returns></returns>
    [HttpPost("requests", Name = "CreateRequest")]
    [Authorize]
    [Consumes("application/json")]
    public async Task<IActionResult> CreateRequest([FromBody] RequestInputModel model)
    {
        var userId = Guid.Parse(User.Claims.First(x => x.Type == "sub").Value);
        return Ok(new { Id = Guid.NewGuid() });
    }

    /// <summary>
    /// Delete accommodation request
    /// </summary>
    /// <param name="requestId">ID of the accommodation request to delete.</param>
    /// <returns></returns>
    [HttpDelete("requests/{requestId:guid}", Name = "DeleteAccommodationRequest")]
    [Authorize]
    [Consumes("application/json")]
    public async Task<IActionResult> DeleteRequest([FromRoute] Guid requestId)
    {
        var userId = Guid.Parse(User.Claims.First(x => x.Type == "sub").Value);
        return NoContent();
    }
}