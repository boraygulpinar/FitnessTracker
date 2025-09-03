# Stage 1: Build
# .NET 9 SDK'sını kullanıyoruz
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["Server/Server.csproj", "Server/"]
RUN dotnet restore "Server/Server.csproj"
COPY . .
WORKDIR "/src/Server"
RUN dotnet publish "Server.csproj" -c Release -o /app/publish

# Stage 2: Final
# .NET 9 runtime'ını kullanıyoruz
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Server.dll"]