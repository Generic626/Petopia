// This file is the DbContext file. It is used to define the database context and the models that will be used in the application.

using System.Reflection;
using Microsoft.EntityFrameworkCore;
using petopia_server.Models;

namespace petopia_server;
public class MyDbContext(DbContextOptions<MyDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<CustomerOrder> CustomerOrders { get; set; }
    public DbSet<Admin> Admins { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure all models that inherit from BaseModel
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(BaseModel).IsAssignableFrom(entityType.ClrType))
            {
                modelBuilder.Entity(entityType.ClrType)
                    .Property("CreatedAt")
                    .HasColumnType("DATETIME")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                modelBuilder.Entity(entityType.ClrType)
                    .Property("UpdatedAt")
                    .HasColumnType("DATETIME")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                modelBuilder.Entity(entityType.ClrType)
                    .Property("DeletedAt")
                    .HasColumnType("DATETIME")
                    .HasDefaultValueSql(null);

                // Automatically excludes entities where DeletedAt is not null.
                var method = SetGlobalQueryMethod.MakeGenericMethod(entityType.ClrType);
                method.Invoke(this, [modelBuilder]);
            }
        }

        modelBuilder.Entity<Product>(product =>
        {
            // Configure ProductName to be unique
            product.HasIndex(e => e.ProductName)
                .IsUnique();
        });

        modelBuilder.Entity<Category>(category => 
        {
            // Configure CategoryName to be unique
            category.HasIndex(e => e.CategoryName)
                .IsUnique();
        });

        modelBuilder.Entity<Customer>(customer =>
        {
            // Configure CustomerUsername to be unique
            customer.HasIndex(e => e.CustomerUsername)
                .IsUnique();
        });

        modelBuilder.Entity<CustomerOrder>(order =>
        {
            // Configure composite key
            order.HasKey(e => new { e.OrderId, e.CustomerId, e.ProductId });
        });

        modelBuilder.Entity<Admin>(admin =>
        {
            // Configure Username to be unique
            admin.HasIndex(e => e.Username)
                .IsUnique();
        });
    }

    // Automatically excludes entities where DeletedAt is not null.
    private static readonly MethodInfo SetGlobalQueryMethod = typeof(MyDbContext)
        .GetMethods(BindingFlags.Public | BindingFlags.Instance)
        .Single(t => t.IsGenericMethod && t.Name == "SetGlobalQuery");

    // Automatically excludes entities where DeletedAt is not null.
    public void SetGlobalQuery<T>(ModelBuilder builder) where T : BaseModel
    {
        builder.Entity<T>().HasQueryFilter(e => e.DeletedAt == null);
    }

    // Automatically updates the UpdatedAt property when an entity is modified.
    // Soft deletes an entity by setting the DeletedAt property when an entity is deleted.
    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<BaseModel>())
        {
            switch (entry.State)
            {
                case EntityState.Modified:
                    entry.Entity.UpdatedAt = DateTime.Now;
                    break;

                case EntityState.Deleted:
                    entry.State = EntityState.Unchanged;
                    entry.Entity.DeletedAt = DateTime.Now;
                    break;
            }
        }
        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }
}
