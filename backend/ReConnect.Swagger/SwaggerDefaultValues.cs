using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace ReConnect.Swagger;

internal class SwaggerDefaultValues : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        if ( operation.Parameters == null )
        {
            return;
        }

        foreach ( var parameter in operation.Parameters )
        {
            var description = context.ApiDescription.ParameterDescriptions
                .First( p => p.Name == parameter.Name );

            if ( parameter.Schema.Default == null )
            {
                parameter.Schema.Default = new OpenApiString(description.DefaultValue as string);
            }
        }
    }
}