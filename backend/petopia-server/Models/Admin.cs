using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace petopia_server.Models
{
    public class Admin
    {
        [Key][DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid Id { get; set; } = Guid.NewGuid();
        [StringLength(255)]
        public required string Username { get; set; }
        [StringLength(255)]
        public required string Password { get; set; }
        public DateTime CreatedAt { get; set; } // Datetime is not supported by default in MySQL, make sure to config it in DbContext
        
        private readonly PasswordHasher<Admin> _passwordHasher = new();

        public string HashPassword(string password)
        {
            return _passwordHasher.HashPassword(this, password);
        }

        public bool VerifyPassword(string password)
        {
            PasswordVerificationResult result = _passwordHasher.VerifyHashedPassword(this, Password, password);
            return result == PasswordVerificationResult.Success;
        }
    }

    public class AdminDTO
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Token { get; set; }
    }

    public class AdminDTO_PRINT
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
