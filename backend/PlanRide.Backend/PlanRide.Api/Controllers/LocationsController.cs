using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlanRide.Api.Models;
using PlanRide.Infrastructure.EntityFramework;

namespace PlanRide.Api.Controllers
{
    [ApiController]
    [Route("locations")]
    public class LocationsController : ControllerBase
    {
        private readonly PlanRideDb _planRideDb;

        public LocationsController(PlanRideDb planRideDb)
        {
            _planRideDb = planRideDb;
        }

        [HttpGet("countries", Name = "Countries")]
        public async Task<ICollection<CountryViewModel>> GetCountries()
        {
            var results = await
                _planRideDb
                    .Countries
                    .Select(c => new CountryViewModel(c.Code.ToLower(), c.Name))
                    .ToListAsync();

            return results;
        }

        [HttpGet("country/{countryCode}/regions", Name = "Regions")]
        public async Task<ICollection<RegionViewModel>> GetRegions(string countryCode)
        {
            var results = await
                _planRideDb
                    .Regions
                    .Where(e => e.Country.Code == countryCode)
                    .Select(r => new RegionViewModel(r.Id, r.Name))
                    .ToListAsync();
            return results;
        }

        [HttpGet("country/{countryCode}/cities", Name = "Cities")]
        public async Task<ICollection<LocationViewModel>> GetCities([FromRoute]string countryCode, [FromQuery]string search)
        {
            if (string.IsNullOrWhiteSpace(search) || search.Length < 3)
            {
                return Array.Empty<LocationViewModel>();
            }

            var results = await
                _planRideDb
                    .Cities
                    .Include(e => e.Region.Country)
                    .Where(c => c.Region.Country.Code == countryCode && c.Name.StartsWith(search))
                    .TagWith(nameof(LocationsController) + nameof(GetCities))
                    .Select(c => new LocationViewModel(
                        c.Id,
                        c.Name,
                        c.Region.Country.Code,
                        c.Region.Id,
                        c.Region.Name))
                    .ToListAsync();
            return results;
        }
    }
}