using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace PlanRide.Infrastructure.EntityFramework;

public class PlanRideDbDesignTimeFactory : IDesignTimeDbContextFactory<PlanRideDb>
{
    public PlanRideDb CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<PlanRideDb>();
        optionsBuilder.UseSqlServer("Server=tcp:planride.database.windows.net,1433;Initial Catalog=PlanRide;Persist Security Info=False;User ID=sqladministrator;Password=nwv2ftg2kpb-vpn7PWE;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        return new PlanRideDb(optionsBuilder.Options);
    }
}