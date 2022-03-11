namespace ReConnect.Accommodation.Api.Models.Offers;

public record RequestViewModel(
    Guid OfferId,
    DateOnly FromDate,
    int DaysOfStay,
    int NumberOfAdults,
    int NumberOfChildren,
    int NumberOfBabies,
    bool HavePets,
    string? Comments,
    DateTimeOffset DateCreated
);