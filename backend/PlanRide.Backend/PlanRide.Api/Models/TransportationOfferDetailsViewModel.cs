namespace PlanRide.Api.Models;

public record TransportationOfferDetailsViewModel(
    Guid Id,
    Guid UserId,
    string UserName,
    string DepartureCountryCode,
    int DepartureCityId,
    string DepartureCityName,
    string DestinationCountryCode,
    int DestinationCityId,
    string DestinationCityName,
    int NumberOfSeats,
    DateOnly DepartureDate,
    TimeOnly DepartureTime,
    string FirstName,
    string LastName,
    string Email,
    string Mobile,
    string? Comments,
    DateTimeOffset DateCreated);
