namespace PlanRide.Api.Models;

public record TransportationRequestDetailsViewModel(
    Guid Id,
    string DepartureCountryCode,
    int DepartureCityId,
    string DepartureCityName,
    int NumberOfPeople,
    bool HavePets,
    DateOnly DepartureDate,
    string FirstName,
    string LastName,
    string Email,
    string Mobile,
    string? Comments,
    DateTimeOffset DateCreated);