FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

COPY . .
RUN dotnet publish ReConnect.Accommodation.Api --output /app/ --configuration Release

FROM mcr.microsoft.com/dotnet/aspnet:6.0

COPY --from=build-env /app .
ENTRYPOINT ["dotnet", "ReConnect.Accommodation.Api"]
