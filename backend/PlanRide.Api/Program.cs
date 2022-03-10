using FluentValidation;
using FluentValidation.AspNetCore;
using IdentityServer4.Configuration;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using PlanRide.Api.Identity;
using PlanRide.Api.Models;
using PlanRide.Api.Services;
using PlanRide.Api.Utils;
using PlanRide.Infrastructure;
using PlanRide.Infrastructure.EntityFramework;

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
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SupportNonNullableReferenceTypes();
    c.SchemaFilter<IgnoreReadOnlySchemaFilter>();
    c.SchemaFilter<RequiredNotNullableSchemaFilter>();
    c.OperationFilter<SecurityRequirementsOperationFilter>();

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
});
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
    context.Database.EnsureCreated();
    // DbInitializer.Initialize(context);
}

app.UseRouting();
app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseStaticFiles();
app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseIdentityServer();

app.Run();