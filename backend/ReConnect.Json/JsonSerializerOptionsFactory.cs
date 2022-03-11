using System.Text.Json;
using System.Text.Json.Serialization;

namespace ReConnect.Json;

public static class JsonSerializerOptionsFactory
{
    public static JsonSerializerOptions Create()
    {
        var result = new JsonSerializerOptions();
        result.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            
        result.Converters.Add(new DateOnlyJsonConverter());
        result.Converters.Add(new TimeOnlyJsonConverter());
        result.Converters.Add(new JsonStringEnumConverter());
            
        return result;
    }
}