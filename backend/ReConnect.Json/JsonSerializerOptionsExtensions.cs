using System.Text.Json;

namespace ReConnect.Json;

public static class JsonSerializerOptionsExtensions
{
    public static void ApplyTo(this JsonSerializerOptions source, JsonSerializerOptions target)
    {
        target.PropertyNamingPolicy = source.PropertyNamingPolicy;
        target.Converters.Clear();
        foreach (var converter in source.Converters)
        {
            target.Converters.Add(converter);
        }
    }
}