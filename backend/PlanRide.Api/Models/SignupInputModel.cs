namespace PlanRide.Api.Models;

/// <summary>
/// Input model for creating a new user account
/// </summary>
/// <param name="FirstName">First name</param>
/// <param name="LastName">Last name</param>
/// <param name="Email">E-mail address (aaa@bbb.com)</param>
/// <param name="Mobile">Mobile phone number (+XXYYYYYYYY)</param>
public record SignupInputModel(
    string FirstName, 
    string LastName, 
    string Email, 
    string Mobile
    );