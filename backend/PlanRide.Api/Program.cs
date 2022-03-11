using FluentValidation;
using FluentValidation.AspNetCore;
using IdentityServer4.Configuration;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using PlanRide.Api.Identity;
using PlanRide.Api.Models;
using PlanRide.Api.Services;
using PlanRide.Infrastructure;
using PlanRide.Infrastructure.EntityFramework;
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
builder.Services.AddReConnectSwagger("Re:Connect Transportation API",
    "Supports user journeys related with transportation offers and transportation requests.",
    Path.Combine(Path.GetDirectoryName(typeof(TransportationOfferViewModel).Assembly.Location) ?? "",
        "PlanRide.Api.xml"));
builder.Services.AddTransient<IProfileService, ProfileService>();
builder.Services.AddApplicationInsightsTelemetry();
builder.Services.AddDbContext<PlanRideDb>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PlanRide")));

var migrationsAssembly = typeof(Program).Assembly.GetName().Name;

builder.Services.AddIdentityServer(o =>
    {
        o.UserInteraction = new UserInteractionOptions()
        {
            LogoutUrl = "/Account/Logout",
            LoginUrl = "/Account/Login",
            LoginReturnUrlParameter = "returnUrl"
        };
        o.IssuerUri = builder.Configuration["IssuerUrl"];
        o.Csp.Level = CspLevel.One;
        o.InputLengthRestrictions.Scope = 500;
    })
    .AddInMemoryIdentityResources(Config.GetIdentityResources())
    .AddInMemoryApiResources(Config.GetApis())
    .AddInMemoryClients(Config.GetClients(builder.Configuration["ServiceUriList"].Split(';')))
    .AddInMemoryApiScopes(Config.GetApiScopes())
    .AddSigningCredential(CredentialsHelper.ReadCertificate(builder.Configuration));

builder
    .Services
    .AddAuthentication()
    .AddIdentityServerAuthentication(o =>
    {
        o.Authority = builder.Configuration["IssuerUrl"];
        o.ApiName = "planride-api";
        o.RequireHttpsMetadata = false;
    });
builder.Services.AddAuthorization();

builder.Services.AddCors();
builder.Services.AddResponseCompression();

builder.Services.AddScoped<ISecurePassword, SecurePassword>();
builder.Services.AddScoped<ISignupService, SignupService>();

builder.Services.AddScoped<IValidator<SignupInputModel>, SignupInputModelValidator>();
builder.Services
    .AddScoped<IValidator<CreateTransportationOfferInputModel>, CreateTransportationOfferInputModelValidator>();
builder.Services
    .AddScoped<IValidator<CreateTransportationRequestInputModel>, CreateTransportationRequestInputModelValidator>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<PlanRideDb>();
    // context.Database.EnsureCreated();
    // DbInitializer.Initialize(context);
}

app.UseRouting();
app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseStaticFiles();
app.UseReConnectSwagger();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseIdentityServer();

app.Run();