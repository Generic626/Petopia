# Petopia Server

## Prerequisites

- [.NET 8.0.2](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [mysql 8.0.36](https://dev.mysql.com/downloads/mysql/)

## Installation

1. Change the login credentials in `appsettings.json` to match your mysql server settings
   ```json
   "ConnectionStrings": {
      "DefaultConnection": "server=localhost;port=3306;database=petopia_server_db;user=root;password=root"
   }
   ```
2. Make sure you have [dotnet-ef](https://learn.microsoft.com/en-us/ef/core/cli/dotnet) installed
   ```sh
   dotnet tool install --global dotnet-ef
   ```
3. Run automated migration script to create the database
   ```sh
   ./auto_migrate.sh
   ```
4. Import dummy data by importing ```DummyData``` folder to your mysql server
   1. Open mysql workbench
   2. Select ```Server``` > ```Data Import```
   3. Select ```Import from Dump Project Folder```
   4. Select the ```DummyData``` folder
   5. Click ```Start Import```
5. Run the server
   ```sh
    dotnet run
    ```
