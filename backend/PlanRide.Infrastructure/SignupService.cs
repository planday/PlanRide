using PlanRide.Infrastructure.EntityFramework;

namespace PlanRide.Infrastructure;

public class SignupService : ISignupService
{
    private readonly ISecurePassword _securePassword;
    private readonly PlanRideDb  _dbContext;

    public SignupService(ISecurePassword securePassword, PlanRideDb dbContext)
    {
        _securePassword = securePassword;
        _dbContext = dbContext;
    }

    public async Task SignupAsync(string firstName, string lastName, string email, string mobile)
    {
        var salt = await _securePassword.NewSalt();
        var password = await _securePassword.GeneratePlainTextPassword(10);
        
        var user = new UserAccount
        {
            Id = Guid.NewGuid(),
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            Phone = mobile,
            PasswordSalt = salt,
            PasswordHash = await _securePassword.Hash(password, salt),
            DateCreated = DateTimeOffset.Now,
            IsActive = true
        };

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();
    }
}