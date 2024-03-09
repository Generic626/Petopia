using Microsoft.AspNetCore.Mvc;
using petopia_server;
using petopia_server.Models;
using petopia_server.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
public partial class AdminsController(MyDbContext context, TokenService tokenService) : ControllerBase
{
    private readonly MyDbContext _context = context;
    private readonly TokenService _tokenService = tokenService;

    // GET: api/Admins/All
    [HttpGet("All")][Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<AdminDTO_PRINT>>> GetAdmins()
    {
        return await _context.Admins
            .Select(a => new AdminDTO_PRINT
            {
                Id = a.Id,
                Username = a.Username
            })
            .OrderBy(a => a.Username)
            .ToListAsync();
    }

    // GET: api/Admins/{id}
    [HttpGet("{id}")][Authorize(Roles = "Admin")]
    public async Task<ActionResult<AdminDTO_PRINT>> GetAdmin(Guid id)
    {
        var Admin = await _context.Admins
            .Select(a => new AdminDTO_PRINT
            {
                Id = a.Id,
                Username = a.Username
            })
            .FirstOrDefaultAsync(a => a.Id == id);

        if (Admin == null)
        {
            return NotFound();
        }

        return Admin;
    }

    // POST: api/Admins/Register
    [HttpPost("Register")]
    public async Task<ActionResult<AdminDTO>> RegisterAdmin(Admin Admin)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Username checking
        switch (Admin.Username)
        {
            // Username must be at least 4 characters
            case string username when username.Length < 4:
                return BadRequest(new { message = "Username must be at least 4 characters" });
            // Username can contain only letters, numbers, and special characters
            case string username when !UnameRegex().IsMatch(username):
                return BadRequest(new { message = "Username can contain only letters, numbers, and special characters [@._-]" });
        }

        // Password checking
        switch (Admin.Password)
        {
            // Password must be at least 8 characters
            case string password when password.Length < 8:
                return BadRequest(new { message = "Password must be at least 8 characters" });
            // Password can contain only letters, numbers, and special characters
            case string password when !PasswRegex().IsMatch(password):
                return BadRequest(new { message = "Password can contain only letters, numbers, and special characters [!@#$%^&*._-]" });
            // Password must contain at least one letter, one number, and one special character
            case string password when !password.Any(char.IsLetter) || !password.Any(char.IsNumber) || !password.Any(char.IsPunctuation):
                return BadRequest(new { message = "Password must contain at least one letter, one number, and one special character" });
        }

        // Check if username already exists
        var existingAdmin = await _context.Admins.FirstOrDefaultAsync(a => a.Username == Admin.Username);
        if (existingAdmin != null)
        {
            return BadRequest(new { message = "Username already exists" });
        }

        Admin admin = new()
        {
            Username = Admin.Username,
            Password = Admin.HashPassword(Admin.Password)
        };

        try
        {
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();
        }
        catch
        {
            return BadRequest(new { message = "Error creating admin" });
        }

        AdminDTO adminDTO = new()
        {
            Id = admin.Id,
            Username = admin.Username,
            Token = _tokenService.GenerateJwtToken(admin)
        };

        return CreatedAtAction("GetAdmin", new { id = adminDTO.Id }, adminDTO);
    }

    // POST: api/Admins/Login
    [HttpPost("Login")]
    public async Task<ActionResult<AdminDTO>> LoginAdmin(Admin Admin)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var admin = await _context.Admins
            .Where(a => a.Username == Admin.Username)
            .FirstOrDefaultAsync();

        if (admin == null)
        {
            return NotFound();
        }

        if (!admin.VerifyPassword(Admin.Password))
        {
            return BadRequest(new { message = "Invalid password" });
        }

        AdminDTO adminDTO = new()
        {
            Id = admin.Id,
            Username = admin.Username,
            Token = _tokenService.GenerateJwtToken(admin)
        };

        return adminDTO;
    }

    [GeneratedRegex(@"^[a-zA-Z0-9@._-]+$")]
    private static partial Regex UnameRegex();
    [GeneratedRegex(@"^[a-zA-Z0-9!@#$%^&*._-]+$")]
    private static partial Regex PasswRegex();
}
