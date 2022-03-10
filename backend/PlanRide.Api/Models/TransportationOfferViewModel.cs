namespace PlanRide.Api.Models;

public record TransportationOfferViewModel(
    Guid Id,
    string DepartureCountryCode,
    int DepartureCityId,
    string DepartureCityName,
    string DestinationCountryCode,
    int DestinationCityId,
    string DestinationCityName,
    int NumberOfSeats,
    DateOnly DepartureDate,
    TimeOnly DepartureTime,
    DateTimeOffset DateCreated
);