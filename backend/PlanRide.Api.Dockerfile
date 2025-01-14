﻿FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["PlanRide.Api/PlanRide.Api.csproj", "PlanRide.Api/"]
RUN dotnet restore "PlanRide.Api/PlanRide.Api.csproj"
COPY . .
WORKDIR "/src/PlanRide.Api"
RUN dotnet build "PlanRide.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PlanRide.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PlanRide.Api.dll"]
