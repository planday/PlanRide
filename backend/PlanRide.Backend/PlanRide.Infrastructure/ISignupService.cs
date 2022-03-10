namespace PlanRide.Infrastructure;

public interface ISignupService
{
    Task SignupAsync(string firstName, string lastName, string email, string mobile);
}