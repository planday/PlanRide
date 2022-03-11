using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Formatters;
using ReConnect.Accommodation.Api.Models;
using ReConnect.Accommodation.Api.Models.Offers;
using ReConnect.Json;
using ReConnect.Swagger;

var builder = WebApplication.CreateBuilder(args);

var serializerOptions = JsonSerializerOptionsFactory.Create();

builder.Services
    .AddControllersWithViews(config =>
    {
        // remove other formatters than application/json
        config.OutputFormatters.RemoveType<StringOutputFormatter>();
        var formatter = config.InputFormatters.FirstOrDefault() as SystemTextJsonInputFormatter;
        formatter?.SupportedMediaTypes.Clear();
        formatter?.SupportedMediaTypes.Add("application/json");
    })
    .AddFluentValidation()
    .AddJsonOptions(o => { serializerOptions.ApplyTo(o.JsonSerializerOptions); });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddReConnectSwagger("Re:Connect Accommodation API",
    "Supports user journeys related with accommodation offers and accommodation requests.",
    Path.Combine(Path.GetDirectoryName(typeof(OfferInputModel).Assembly.Location) ?? "",
        "ReConnect.Accommodation.Api.xml"));

builder
    .Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddIdentityServerAuthentication(o =>
    {
        o.Authority = builder.Configuration["IssuerUrl"];
        o.ApiName = "accommodations-api";
        o.RequireHttpsMetadata = false;
    });
builder.Services.AddAuthorization();

builder.Services.AddCors();
builder.Services.AddResponseCompression();

var app = builder.Build();
app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseResponseCompression();
app.UseRouting();
app.UseReConnectSwagger();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();