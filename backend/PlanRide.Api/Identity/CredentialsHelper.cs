using System.Security.Cryptography.X509Certificates;

namespace PlanRide.Api.Identity;

public static class CredentialsHelper
{
    public static X509Certificate2 ReadCertificate(IConfiguration config)
    {
        var cert = Convert.FromBase64String(config["SigningKeyCertificate"]);
        var passwd = config["SigningKeyCertificatePassword"];
        return new X509Certificate2(cert, passwd ?? "", X509KeyStorageFlags.Exportable);
    }
}