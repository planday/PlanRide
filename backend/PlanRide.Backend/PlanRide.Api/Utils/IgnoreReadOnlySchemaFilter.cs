using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace PlanRide.Api.Utils
{
    internal class IgnoreReadOnlySchemaFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            schema.ReadOnly = false;
            if (schema.Properties != null)
            {
                foreach (var keyValuePair in schema.Properties)
                {
                    keyValuePair.Value.ReadOnly = false;
                }
            }
        }
    }
}
