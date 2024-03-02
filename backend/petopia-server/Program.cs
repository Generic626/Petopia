// This file serve as the entry point of the application

using Microsoft.EntityFrameworkCore;
using petopia_server; // Replace with the actual namespace of your project

var builder = WebApplication.CreateBuilder(args);
var allowedOrigins = new string[] { "http://localhost:*" };

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder => builder.WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<petopia_server.Helper.UrlHelper>();

// Add DbContext with MySQL provider
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseMySQL(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers();

app.Run();
