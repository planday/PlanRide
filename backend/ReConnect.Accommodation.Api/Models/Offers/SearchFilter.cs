namespace ReConnect.Accommodation.Api.Models.Offers;

public record SearchFilter(
    LocationFilter? Location,
    int? NumberOfAdults,
    int? NumberOfChildren,
    int? NumberOfBabies,
    bool? PetsAllowed,
    DateOnly? FromDate,
    int? MinimumDaysOfStay
);