namespace ReConnect.Accommodation.Api.Models.Offers;

public record OfferDetailsViewModel(
    LocationViewModel Location,
    int NumberOfAdults,
    int NumberOfChildren,
    int NumberOfBabies,
    bool PetsAllowed,
    DateOnly AvailableFromDate,
    DateOnly AvailableToDate,
    string? Description,
    string? About,
    DateTimeOffset DateCreated
);