using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace petopia_server.Models
{
    public class Admin: BaseModel
    {
        [Key][DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid Id { get; set; } = Guid.NewGuid();
        [StringLength(255)]
        public required string Username { get; set; }
        [StringLength(255)]
        public required string Password { get; set; }
        [StringLength(255)]
        public required string Email { get; set; }
        
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
        public required string Email { get; set; }
        public string? Token { get; set; }
    }

    public class AdminDTO_LOGIN
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }

    public class AdminDTO_PRINT
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
    }
}
