// This file serve as the entry point of the application

using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using petopia_server;
using petopia_server.Models; // Replace with the actual namespace of your project

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

// Add automatic migration
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    try
    {
        var context = services.GetRequiredService<MyDbContext>();
        context.Database.Migrate();

        // Seed the database
        SeedDatabase(context);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while migrating the database.");
    }
}

// Seed the database
static void SeedDatabase(MyDbContext context)
{
    if (!context.Admins.Any() && !context.Customers.Any() && !context.Categories.Any() && !context.Products.Any() && !context.CustomerOrders.Any())
    {
        context.Admins.Add(new Admin
        {
            Username = "admin_123",
            Password = "admin_123",
            Email = "admin@admin.com"
        });

        context.Customers.Add(new Customer
        {
            CustomerUsername = "customer_a1",
            CustomerPassword = "customer_a1",
            CustomerEmail = "customer_a1@gmail.com"
        });

        context.Customers.Add(new Customer
        {
            CustomerUsername = "customer_a2",
            CustomerPassword = "customer_a2",
            CustomerEmail = "customer_a2@gmail.com"
        });

        context.Categories.Add(new Category
        {
            CategoryName = "Dog",
            CategoryDescription = "Anything related to dogs"
        });

        context.Categories.Add(new Category
        {
            CategoryName = "Cat",
            CategoryDescription = "Anything related to cats"
        });

        context.SaveChanges();

        context.Products.Add(new Product
        {
            ProductName = "Dog Food",
            ProductDescription = "Food for dogs",
            ProductPrice = 12,
            ProductQuantity = 100,
            ProductKeywords = "dog, food",
            CategoryId = context.Categories.First(c => c.CategoryName == "Dog").CategoryId
        });

        context.SaveChanges();

        var currentTime = DateTime.Now.ToString("yyyyMMddHHmmss");
        var newGuid = Guid.NewGuid().ToString().Split('-')[0]; // Get the first part of the GUID
        var nextOrderId = $"{newGuid}{currentTime}";

        context.CustomerOrders.Add(new CustomerOrder
        {
            OrderId = nextOrderId,
            CustomerId = context.Customers.First(c => c.CustomerUsername == "customer_a1").CustomerId,
            Customer = context.Customers.First(c => c.CustomerUsername == "customer_a1"),
            ProductId = context.Products.First(p => p.ProductName == "Dog Food").ProductId,
            Product = context.Products.First(p => p.ProductName == "Dog Food"),
            OrderedQuantity = 10,
            OrderStatus = "Pending"
        });

        context.SaveChangesAsync();
    }
}

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
