namespace PlanRide.Infrastructure;

public interface ISecurePassword
{
    Task<string> GeneratePlainTextPassword(int length);
    Task<string> NewSalt();
    Task<string> Hash(string plainTextPassword, string salt);
    Task<bool> Validate(string plainTextPassword, string hash, string salt);
}