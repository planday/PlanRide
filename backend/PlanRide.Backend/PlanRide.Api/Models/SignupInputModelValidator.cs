using FluentValidation;

namespace PlanRide.Api.Models;

public class SignupInputModelValidator : AbstractValidator<SignupInputModel>
{
    public SignupInputModelValidator()
    {
        RuleFor(x => x.FirstName).NotEmpty().MaximumLength(255);
        RuleFor(x => x.LastName).NotEmpty().MaximumLength(255);
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(255);
        RuleFor(x => x.Mobile).NotEmpty().MaximumLength(50);
    }
}