using System.Security.Cryptography;
using System.Text;

namespace PlanRide.Infrastructure;

public class SecurePassword : ISecurePassword
{
    public Task<string> GeneratePlainTextPassword(int length)
    {
        const string valid = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ1234567890!@$%&*#";
        var res = new StringBuilder();
        Random rnd = new Random();
        while (0 < length--)
        {
            res.Append(valid[rnd.Next(valid.Length)]);
        }

        return Task.FromResult(res.ToString());
    }

    public Task<string> NewSalt()
    {
        var rngProvider = RandomNumberGenerator.Create();
        var bytes = new byte[new Random().Next(32, 64)];
        rngProvider.GetBytes(bytes);
        var salt = Convert.ToBase64String(bytes);
        return Task.FromResult(salt);
    }

    public Task<string> Hash(string plainTextPassword, string salt)
    {
        var algorithm = SHA256.Create();
        var passwordBytes = Encoding.UTF8.GetBytes(salt + plainTextPassword);
        var bytes = algorithm.ComputeHash(passwordBytes);
        return Task.FromResult(Convert.ToBase64String(bytes));
    }

    public async Task<bool> Validate(string plainTextPassword, string hash, string salt)
    {
        bool isValid = (await Hash(plainTextPassword, salt)) == hash;
        return isValid;
    }
}