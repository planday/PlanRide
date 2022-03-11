namespace ReConnect.Accommodation.Api.Models;

public record LocationFilter(
    double Lat,
    double Lon,
    int RadiusKm
);