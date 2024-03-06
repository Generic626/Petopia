using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace petopia_server.Models
{
    public class Customer
    {
        [Key][DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid CustomerId { get; set; } = Guid.NewGuid();
        [StringLength(255)]
        public required string CustomerUsername { get; set; }
        [StringLength(255)]
        public required string CustomerPassword { get; set; }
        [StringLength(255)]
        public string? CustomerContact { get; set; }
        [StringLength(255)]
        public string? CustomerAddress { get; set; }
        public DateTime CreatedAt { get; set; } // Datetime is not supported by default in MySQL, make sure to config it in DbContext
        
        private readonly PasswordHasher<Customer> _passwordHasher = new();

        public string HashPassword(string password)
        {
            return _passwordHasher.HashPassword(this, password);
        }

        public bool VerifyPassword(string password)
        {
            PasswordVerificationResult result = _passwordHasher.VerifyHashedPassword(this, CustomerPassword, password);
            return result == PasswordVerificationResult.Success;
        }
    }

    public class CustomerDTO
    {
        public Guid CustomerId { get; set; }
        public required string CustomerUsername { get; set; }
        public string? CustomerContact { get; set; }
        public string? CustomerAddress { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Token { get; set; }
    }

    public class CustomerDTO_PRINT
    {
        public Guid CustomerId { get; set; }
        public required string CustomerUsername { get; set; }
        public string? CustomerContact { get; set; }
        public string? CustomerAddress { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CustomerDTO_MODIFY
    {
        public Guid CustomerId { get; set; }
        public string? NewContact { get; set; }
        public string? NewAddress { get; set; }
        public string? NewPassword { get; set; }
    }
}
