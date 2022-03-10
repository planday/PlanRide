using Microsoft.EntityFrameworkCore;

namespace PlanRide.Infrastructure.EntityFramework
{
    public class PlanRideDb : DbContext
    {
        public DbSet<Country> Countries { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<TransportationOffer> TransportationOffers { get; set; }
        public DbSet<TransportationRequest> TransportationRequests { get; set; }
        public DbSet<UserAccount> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var user = modelBuilder.Entity<UserAccount>();
            user.HasKey(e => e.Id);
            user.ToTable("Users");


            var offer = modelBuilder.Entity<TransportationOffer>();
            offer.HasOne(e => e.User).WithMany().HasForeignKey(u => u.UserId).OnDelete(DeleteBehavior.Cascade);
            offer.HasOne(e => e.DepartureCity).WithMany().HasForeignKey(u => u.DepartureCityId)
                .OnDelete(DeleteBehavior.Restrict);
            offer.HasOne(e => e.DestinationCity).WithMany().HasForeignKey(u => u.DestinationCityId)
                .OnDelete(DeleteBehavior.Restrict);
            offer.HasOne(e => e.User).WithMany().HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            offer.Property(x => x.DepartureDate)
                .HasConversion<DateOnlyConverter>()
                .HasColumnType("date");
            offer.Property(x => x.DepartureTime)
                .HasConversion<TimeOnlyConverter>()
                .HasColumnType("time");
            offer.HasKey(e => e.Id);
            offer.ToTable("TransportationOffers");


            var city = modelBuilder.Entity<City>();
            city.Property(e => e.Id);
            city.ToTable("Cities").HasKey(e => e.Id);
            city.HasOne(e => e.Region).WithMany(e => e.Cities).OnDelete(DeleteBehavior.Cascade);

            var region = modelBuilder.Entity<Region>();
            region.ToTable("Regions").HasKey(e => e.Id);
            region.HasOne(e => e.Country).WithMany(e => e.Regions).OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Regions_Countries");

            var country = modelBuilder.Entity<Country>();
            country.ToTable("Countries").HasKey(e => e.Id);
            country.HasMany(e => e.Regions).WithOne(e => e.Country).OnDelete(DeleteBehavior.Cascade);

            var request = modelBuilder.Entity<TransportationRequest>();
            request.HasKey(e => e.Id);
            request.ToTable("TransportationRequests");
            request.Property(x => x.DepartureDate)
                .HasConversion<DateOnlyConverter>()
                .HasColumnType("date");
            request.HasOne(e => e.DepartureCity).WithMany().HasForeignKey(u => u.DepartureCityId)
                .OnDelete(DeleteBehavior.Restrict);
            request.HasOne(e => e.User).WithMany().HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public PlanRideDb(DbContextOptions<PlanRideDb> options) : base(options)
        {
        }
    }
}