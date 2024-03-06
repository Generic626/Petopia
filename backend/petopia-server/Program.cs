// This file serve as the entry point of the application

using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using petopia_server; // Replace with the actual namespace of your project

var builder = WebApplication.CreateBuilder(args);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder => builder.SetIsOriginAllowed(origin => new Uri(origin).IsLoopback)
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<petopia_server.Services.UrlHelper>();

// Add DbContext with MySQL provider
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseMySQL(connectionString));

// Configure JWT authentication
if (string.IsNullOrEmpty(builder.Configuration["Jwt:Key"]))
{
    throw new InvalidOperationException("Jwt:Key is missing from configuration");
}
if (string.IsNullOrEmpty(builder.Configuration["Jwt:Issuer"]))
{
    throw new InvalidOperationException("Jwt:Issuer is missing from configuration");
}
if (string.IsNullOrEmpty(builder.Configuration["Jwt:Audience"]))
{
    throw new InvalidOperationException("Jwt:Audience is missing from configuration");
}
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? string.Empty))
        };
    });

builder.Services.AddTransient<petopia_server.Services.TokenService>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy => policy.RequireClaim(ClaimTypes.Role, "Admin"));
    options.AddPolicy("Customer", policy => policy.RequireClaim(ClaimTypes.Role, "Customer"));
});

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
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
