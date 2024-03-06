// This file is the DbContext file. It is used to define the database context and the models that will be used in the application.

using Microsoft.EntityFrameworkCore;
using petopia_server.Models;

namespace petopia_server;
public class MyDbContext(DbContextOptions<MyDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<CustomerOrder> CustomerOrders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>(product =>
        {
            // Configure CreatedAt to use the current timestamp on insert
            product.Property(e => e.CreatedAt)
                .HasColumnType("DATETIME")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Configure ProductName to be unique
            product.HasIndex(e => e.ProductName)
                .IsUnique();
        });

        modelBuilder.Entity<Category>(category => 
        {
            // Configure CreatedAt to use the current timestamp on insert
            category.Property(e => e.CreatedAt)
                .HasColumnType("DATETIME")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Configure CategoryName to be unique
            category.HasIndex(e => e.CategoryName)
                .IsUnique();
        });

        modelBuilder.Entity<Customer>(customer =>
        {
            // Configure CreatedAt to use the current timestamp on insert
            customer.Property(e => e.CreatedAt)
                .HasColumnType("DATETIME")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Configure CustomerUsername to be unique
            customer.HasIndex(e => e.CustomerUsername)
                .IsUnique();
        });

        modelBuilder.Entity<CustomerOrder>(order =>
        {
            // Configure composite key
            order.HasKey(e => new { e.OrderId, e.CustomerId, e.ProductId });
            
            // Configure CreatedAt to use the current timestamp on insert
            order.Property(e => e.CreatedAt)
                .HasColumnType("DATETIME")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
        });
    }
}
