using System.Text.Json;
using System.Text.Json.Serialization;

namespace PlanRide.Api.Utils
{
    public class TimeOnlyJsonConverter : JsonConverter<TimeOnly>
    {
        public override TimeOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return TimeOnly.Parse(reader.GetString() ?? "00:00");
        }

        public override void Write(Utf8JsonWriter writer, TimeOnly value, JsonSerializerOptions options)
        {
            var isoTime = value.ToString("HH:mm");
            writer.WriteStringValue(isoTime);
        }
    }
}
