using FluentValidation;

namespace PlanRide.Api.Models;

public class CreateTransportationOfferInputModelValidator : AbstractValidator<CreateTransportationOfferInputModel>
{
    public CreateTransportationOfferInputModelValidator()
    {
        RuleFor(x => x.Email).NotNull().EmailAddress();
        RuleFor(x => x.FirstName).NotEmpty().MaximumLength(255);
        RuleFor(x => x.LastName).NotEmpty().MaximumLength(255);
        RuleFor(x => x.Mobile).NotEmpty().MaximumLength(255);
        RuleFor(x => x.NumberOfSeats).GreaterThan(0);
        RuleFor(x => x.DepartureDate).GreaterThan(DateOnly.FromDateTime(DateTime.Now.AddDays(-1)));
        RuleFor(x => x.DepartureLocationId).CustomAsync((l, context, arg3) => { return Task.CompletedTask; });
        RuleFor(x => x.DestinationLocationId).CustomAsync((l, context, arg3) => { return Task.CompletedTask; });
    }
}