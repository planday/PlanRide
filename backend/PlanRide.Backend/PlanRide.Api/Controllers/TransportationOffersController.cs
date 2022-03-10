using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlanRide.Api.Models;
using PlanRide.Infrastructure.EntityFramework;

namespace PlanRide.Api.Controllers
{
    [ApiController]
    [Route("offers")]
    public class TransportationOffersController : ControllerBase
    {
        private readonly ILogger<TransportationOffersController> _logger;

        private PlanRideDb _dbContext;

        public TransportationOffersController(ILogger<TransportationOffersController> logger, PlanRideDb dbContext) =>
            (_logger, _dbContext) = (logger, dbContext);

        [HttpGet(Name = "GetOffers")]
        public async Task<ICollection<TransportationOfferViewModel>> GetOffers()
        {
            var results = await _dbContext.TransportationOffers
                .TagWith(nameof(TransportationOffersController) + nameof(GetOffers))
                .Include(e => e.DepartureCity)
                .ThenInclude(c => c.Region.Country)
                .Include(e => e.DestinationCity)
                .ThenInclude(c => c.Region.Country)
                .Select(o => new TransportationOfferViewModel(
                    o.Id,
                    o.DepartureCity.Region.Country.Code,
                    o.DepartureCityId,
                    o.DepartureCity.Name,
                    o.DestinationCity.Region.Country.Code,
                    o.DestinationCityId,
                    o.DestinationCity.Name,
                    o.NumberOfSeats,
                    o.DepartureDate,
                    o.DepartureTime,
                    o.DateCreated
                ))
                .ToListAsync();

            return results;
        }

        [HttpGet("{offerId:guid}", Name = "GetOfferDetails")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<TransportationOfferDetailsViewModel> GetOfferDetails(Guid offerId)
        {
            var offer = await _dbContext.TransportationOffers
                .TagWith(nameof(TransportationOffersController) + nameof(GetOffers))
                .Include(e => e.User)
                .Include(e => e.DepartureCity)
                .ThenInclude(c => c.Region.Country)
                .Include(e => e.DestinationCity)
                .ThenInclude(c => c.Region.Country)
                .Select(o => new TransportationOfferDetailsViewModel(
                    o.Id,
                    o.UserId,
                    $"{o.User.FirstName} {o.User.LastName}",
                    o.DepartureCity.Region.Country.Code,
                    o.DepartureCityId,
                    o.DepartureCity.Name,
                    o.DestinationCity.Region.Country.Code,
                    o.DestinationCityId,
                    o.DestinationCity.Name,
                    o.NumberOfSeats,
                    o.DepartureDate,
                    o.DepartureTime,
                    o.FirstName,
                    o.LastName,
                    o.Email,
                    o.Mobile,
                    o.Comments,
                    o.DateCreated
                ))
                .SingleAsync(e => e.Id == offerId);
            return offer;
        }

        [HttpPost(Name = "CreateOffer")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Consumes("application/json")]
        public async Task<IActionResult> CreateOffer([FromBody] CreateTransportationOfferInputModel model)
        {
            var userId = Guid.Parse(User.Claims.First(x => x.Type == "sub").Value);
            var offer = new TransportationOffer
            {
                DepartureCityId = model.DepartureLocationId,
                DestinationCityId = model.DestinationLocationId,
                DepartureDate = model.DepartureDate,
                DepartureTime = model.DepartureTime,
                UserId = userId,
                NumberOfSeats = model.NumberOfSeats,
                Comments = model.Comments,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Mobile = model.Mobile,
                DateCreated = DateTimeOffset.Now
            };
            _dbContext.TransportationOffers.Add(offer);
            await _dbContext.SaveChangesAsync();
            return Ok(new { Id = offer.Id });
        }
    }
}