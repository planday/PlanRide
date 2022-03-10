using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlanRide.Api.Models;
using PlanRide.Infrastructure.EntityFramework;

namespace PlanRide.Api.Controllers
{
    [ApiController]
    [Route("requests")]
    public class TransportationRequestsController : ControllerBase
    {
        private readonly ILogger<TransportationRequest> _logger;

        private PlanRideDb _dbContext;

        public TransportationRequestsController(ILogger<TransportationRequest> logger, PlanRideDb dbContext) =>
            (_logger, _dbContext) = (logger, dbContext);

        [HttpGet(Name = "GetRequests")]
        public async Task<ICollection<TransportationRequestViewModel>> GetRequests()
        {
            var results = await _dbContext.TransportationRequests
                .TagWith(nameof(TransportationRequestsController) + nameof(GetRequests))
                .Include(e => e.DepartureCity)
                .ThenInclude(c => c.Region.Country)
                .Select(o => new TransportationRequestViewModel(
                    o.Id,
                    o.DepartureCity.Region.Country.Code,
                    o.DepartureCityId,
                    o.DepartureCity.Name,
                    o.NumberOfAdults + o.NumberOfChildren,
                    o.NumberOfPets > 0,
                    o.DepartureDate,
                    o.DateCreated
                ))
                .ToListAsync();

            return results;
        }

        [HttpGet("{requestId:guid}", Name = "GetRequestDetails")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<TransportationRequestDetailsViewModel> GetRequestDetails(Guid requestId)
        {
            var request = await _dbContext.TransportationRequests
                .TagWith(nameof(TransportationRequestsController) + nameof(GetRequestDetails))
                .Include(e => e.DepartureCity)
                .ThenInclude(c => c.Region.Country)
                .Select(o => new TransportationRequestDetailsViewModel(
                    o.Id,
                    o.DepartureCity.Region.Country.Code,
                    o.DepartureCityId,
                    o.DepartureCity.Name,
                    o.NumberOfAdults + o.NumberOfChildren,
                    o.NumberOfPets > 0,
                    o.DepartureDate,
                    o.FirstName,
                    o.LastName,
                    o.Email,
                    o.Mobile,
                    o.Comments,
                    o.DateCreated
                ))
                .SingleAsync();

            return request;
        }

        [HttpPost(Name = "CreateRequest")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Consumes("application/json")]
        public async Task<IActionResult> CreateTransportationRequest(
            [FromBody] CreateTransportationRequestInputModel model)
        {
            var userId = Guid.Parse(User.Claims.First(x => x.Type == "sub").Value);
            var request = new TransportationRequest
            {
                DepartureCityId = model.DepartureLocationId,
                DepartureDate = model.DepartureDate,
                NumberOfAdults = model.NumberOfAdults,
                NumberOfChildren = model.NumberOfChildren,
                NumberOfPets = model.NumberOfPets,
                UserId = userId,
                Comments = model.Comments,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Mobile = model.Mobile,
                DateCreated = DateTimeOffset.Now
            };
            _dbContext.TransportationRequests.Add(request);
            await _dbContext.SaveChangesAsync();
            return Ok(new { Id = request.Id });
        }


        [HttpDelete("{requestId:guid}", Name = "DeleteRequest")]
        [Authorize]
        public async Task<IActionResult> DeleteRequest(Guid requestId)
        {
            var request = await _dbContext.TransportationRequests.FindAsync(requestId);
            _dbContext.TransportationRequests.Remove(request);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}