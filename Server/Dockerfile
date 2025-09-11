FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["Server.csproj", "."]
RUN dotnet restore "Server.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet publish "Server.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 5000
ENTRYPOINT ["dotnet", "Server.dll"]