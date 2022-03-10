namespace PlanRide.Api.Models;

public record CreateTransportationRequestInputModel(
    int DepartureLocationId,
    DateOnly DepartureDate,
    int NumberOfAdults,
    int NumberOfChildren,
    int NumberOfPets,
    string FirstName,
    string LastName,
    string Email,
    string Mobile,
    string? Comments
);