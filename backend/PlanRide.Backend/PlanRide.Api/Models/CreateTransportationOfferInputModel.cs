using PlanRide.Infrastructure.EntityFramework;

namespace PlanRide.Api.Models
{
    public record CreateTransportationOfferInputModel(
        int DepartureLocationId,
        DateOnly DepartureDate,
        TimeOnly DepartureTime,
        int DestinationLocationId,
        int NumberOfSeats,
        string FirstName,
        string LastName,
        string Email,
        string Mobile,
        string? Comments
    );
}