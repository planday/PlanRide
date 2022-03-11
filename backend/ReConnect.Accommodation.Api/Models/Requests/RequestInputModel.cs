namespace ReConnect.Accommodation.Api.Models.Requests;

public record RequestInputModel(
    Guid OfferId,
    RequestStatus Status,
    DateOnly FromDate,
    int DaysOfStay,
    int NumberOfAdults,
    int NumberOfChildren,
    int NumberOfBabies,
    bool HavePets,
    string? Comments
);