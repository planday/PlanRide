namespace ReConnect.Accommodation.Api.Models.Offers;

public record OfferViewModel(
    LocationViewModel Location,
    int NumberOfAdults,
    int NumberOfChildren,
    int NumberOfBabies,
    bool PetsAllowed,
    DateOnly AvailableFromDate,
    DateOnly AvailableToDate
);