namespace PlanRide.Api.Models;

public record TransportationRequestViewModel(
    Guid Id,
    string DepartureCountryCode,
    int DepartureCityId,
    string DepartureCityName,
    int NumberOfPeople,
    bool HavePets,
    DateOnly DepartureDate,
    DateTimeOffset DateCreated);