namespace PlanRide.Infrastructure.EntityFramework
{
    public class Country
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Language { get; set; }
        public ICollection<Region> Regions { get; set; }
    }

    public class Region
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<City> Cities { get; set; }
        public Country Country { get; set; }
    }

    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Region Region { get; set; }
    }

    public class TransportationOffer
    {
        public Guid Id { get; set; }
        public City DepartureCity { get; set; }
        public int DepartureCityId { get; set; }
        public City DestinationCity { get; set; }
        public int DestinationCityId { get; set; }
        public DateOnly DepartureDate { get; set; }
        public TimeOnly DepartureTime { get; set; }
        public UserAccount User { get; init; }
        public Guid UserId { get; init; }
        public int NumberOfSeats { get; set; } = 0;
        public string? Comments { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public DateTimeOffset DateCreated { get; set; }
    }

    public class TransportationRequest
    {
        public Guid Id { get; set; }
        public UserAccount User { get; set; }
        public Guid UserId { get; set; }
        public City DepartureCity { get; set; }
        public int DepartureCityId { get; set; }
        public DateOnly DepartureDate { get; set; }
        public int NumberOfAdults { get; set; }
        public int NumberOfChildren { get; set; }
        public int NumberOfPets { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string? Comments { get; set; }
        public DateTimeOffset DateCreated { get; set; }
    }

    public class UserAccount
    {
        public Guid Id { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public bool IsActive { get; set; }
    }
}