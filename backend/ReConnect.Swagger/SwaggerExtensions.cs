using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;

namespace ReConnect.Swagger;

public static class SwaggerExtensions
{
    public static IServiceCollection AddReConnectSwagger(this IServiceCollection services, string? apiTitle = null,
        string? apiDescription = null, string? xmlCommentsFilePath = null)
    {
        services.AddSwaggerGen(c =>
        {
            if (!string.IsNullOrEmpty(xmlCommentsFilePath) && File.Exists(xmlCommentsFilePath))
            {
                c.IncludeXmlComments(xmlCommentsFilePath);
            }

            c.SupportNonNullableReferenceTypes();
            c.SchemaFilter<EnumSchemaFilter>();
            c.SchemaFilter<IgnoreReadOnlySchemaFilter>();
            c.SchemaFilter<RequiredNotNullableSchemaFilter>();
            c.OperationFilter<SecurityRequirementsOperationFilter>();
            c.OperationFilter<SwaggerDefaultValues>();

            c.MapType(typeof(DateOnly),
                () => new OpenApiSchema
                {
                    Type = "string",
                    Format = "date",
                    Example = new OpenApiString("2018-12-31"),
                    Description = "ISO-8601 date string"
                });
            c.MapType(typeof(TimeOnly),
                () => new OpenApiSchema
                {
                    Type = "string",
                    Example = new OpenApiString("16:45"),
                    Description = "ISO-8601 time string (HH:mm)"
                });
            if (!string.IsNullOrEmpty(apiTitle))
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = apiTitle,
                    Description = apiDescription
                });
            }
        });
        return services;
    }

    public static IApplicationBuilder UseReConnectSwagger(this IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        return app;
    }
}