FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
EXPOSE 80
EXPOSE 443

COPY . .
RUN dotnet publish ReConnect.Accommodation.Api --output /app/ --configuration Release

FROM mcr.microsoft.com/dotnet/aspnet:6.0

ENV ASPNETCORE_URLS http://*:80

COPY --from=build-env /app .
ENTRYPOINT ["dotnet", "ReConnect.Accommodation.Api.dll"]
