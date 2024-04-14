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
        var admin = new Admin
        {
            Username = "admin_123",
            Password = "admin_123",
            Email = "admin@admin.com"
        };
        admin.Password = admin.HashPassword("admin_123");
        context.Admins.Add(admin);

        var customer_a1 = new Customer
        {
            CustomerUsername = "customer_a1",
            CustomerPassword = "customer_a1",
            CustomerEmail = "customer_a1@gmail.com"
        };
        customer_a1.CustomerPassword = customer_a1.HashPassword("customer_a1");
        context.Customers.Add(customer_a1);

        var customer_a2 = new Customer
        {
            CustomerUsername = "customer_a2",
            CustomerPassword = "customer_a2",
            CustomerEmail = "customer_a2@gmail.com"
        };
        customer_a2.CustomerPassword = customer_a2.HashPassword("customer_a2");
        context.Customers.Add(customer_a2);

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
            ProductName = "[AATU] Dog Food (Duck)",
            ProductDescription = "80% Duck, 20% Fruit & Veg, Grain-Free, Hypoallergenic, Superfood Enriched, 100% Natural, 100% Delicious!",
            ProductPrice = 12,
            ProductQuantity = 100,
            ProductKeywords = "dog, food",
            ProductImage = "00dc3f45-6d8a-4d39-9443-89081a2bc8e5.webp",
            CategoryId = context.Categories.First(c => c.CategoryName == "Dog").CategoryId
        });

        context.Products.Add(new Product
        {
            ProductName = "[AATU] Dog Food (Salmon & Herring)",
            ProductDescription = "80% Salmon & Herring, 20% Fruit & Veg, Grain-Free, Hypoallergenic, Superfood Enriched, 100% Natural, 100% Delicious!",
            ProductPrice = 12,
            ProductQuantity = 100,
            ProductKeywords = "dog, food",
            ProductImage = "621efcd1-0bb4-493b-af54-facb1f860b5a.webp",
            CategoryId = context.Categories.First(c => c.CategoryName == "Dog").CategoryId
        });

        context.Products.Add(new Product
        {
            ProductName = "[Nulo] Dog Food (Adult)",
            ProductDescription = "beef, barley & lamb meal recipe",
            ProductPrice = 10,
            ProductQuantity = 100,
            ProductKeywords = "dog, food",
            ProductImage = "1ab189d9-4a54-42e9-ac26-bf73859f2cbe.webp",
            CategoryId = context.Categories.First(c => c.CategoryName == "Dog").CategoryId
        });

        context.Products.Add(new Product
        {
            ProductName = "[Nulo] Dog Food (Puppy)",
            ProductDescription = "chicken, oats & turkey recipe",
            ProductPrice = 10,
            ProductQuantity = 100,
            ProductKeywords = "dog, food",
            ProductImage = "6e0dc9a9-7db8-4b34-8530-40ea8c0a8843.webp",
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
            ProductId = context.Products.First(p => p.ProductName == "[AATU] Dog Food (Duck)").ProductId,
            Product = context.Products.First(p => p.ProductName == "[AATU] Dog Food (Duck)"),
            OrderedQuantity = 10,
            OrderStatus = "Pending"
        });

        context.SaveChanges();
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
