namespace ReConnect.Accommodation.Api.Models.Offers;

public record OfferInputModel(
    LocationViewModel Location,
    DateOnly AvailableFromDate,
    DateOnly AvailableToDate,
    int NumberOfAdults,
    int NumberOfChildren,
    int NumberOfBabies,
    bool PetsAllowed,
    string? Description,
    string? About
);