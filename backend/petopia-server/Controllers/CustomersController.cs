using Microsoft.AspNetCore.Mvc;
using petopia_server;
using petopia_server.Models;
using petopia_server.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
public partial class CustomersController(MyDbContext context, TokenService tokenService) : ControllerBase
{
    private readonly MyDbContext _context = context;
    private readonly TokenService _tokenService = tokenService;

    // GET: api/Customers/All
    [HttpGet("All")][Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<CustomerDTO_PRINT>>> GetCustomers()
    {
        return await _context.Customers
            .Select(c => new CustomerDTO_PRINT
            {
                CustomerId = c.CustomerId,
                CustomerUsername = c.CustomerUsername,
                CustomerEmail = c.CustomerEmail,
                CustomerContact = c.CustomerContact,
                CustomerAddress = c.CustomerAddress,
            })
            .OrderBy(c => c.CustomerUsername)
            .ToListAsync();
    }

    // GET: api/Customers/{id}
    [HttpGet("{id}")][Authorize(Roles = "Admin")]
    public async Task<ActionResult<CustomerDTO_PRINT>> GetCustomer(Guid id)
    {
        var Customer = await _context.Customers
            .Select(c => new CustomerDTO_PRINT
            {
                CustomerId = c.CustomerId,
                CustomerUsername = c.CustomerUsername,
                CustomerEmail = c.CustomerEmail,
                CustomerContact = c.CustomerContact,
                CustomerAddress = c.CustomerAddress
            })
            .FirstOrDefaultAsync(c => c.CustomerId == id);

        if (Customer == null)
        {
            return NotFound();
        }

        return Customer;
    }

    // POST: api/Customers/Register
    [HttpPost("Register")]
    public async Task<ActionResult<CustomerDTO>> RegisterCustomer(Customer Customer)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Username checking
        switch (Customer.CustomerUsername)
        {
            // Username must be at least 4 characters
            case string username when username.Length < 4:
                return BadRequest(new { message = "Username must be at least 4 characters" });
            // Username can contain only letters, numbers, and special characters
            case string username when !UnameRegex().IsMatch(username):
                return BadRequest(new { message = "Username can contain only letters, numbers, and special characters [@._-]" });
        }

        // Password checking
        switch (Customer.CustomerPassword)
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

        // Email checking
        try
        {
            var mailAddress = new System.Net.Mail.MailAddress(Customer.CustomerEmail);
        }
        catch (FormatException)
        {
            return BadRequest(new { message = "Invalid email" });
        }

        // Check if username already exists
        var existingCustomer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerUsername == Customer.CustomerUsername);
        if (existingCustomer != null)
        {
            return BadRequest(new { message = "Username already exists" });
        }

        Customer customer = new()
        {
            CustomerUsername = Customer.CustomerUsername,
            CustomerPassword = Customer.HashPassword(Customer.CustomerPassword),
            CustomerEmail = Customer.CustomerEmail,
            CustomerContact = Customer.CustomerContact,
            CustomerAddress = Customer.CustomerAddress
        };

        try
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
        }
        catch
        {
            return BadRequest(new { message = "Error creating customer" });
        }

        CustomerDTO customerDTO = new()
        {
            CustomerId = customer.CustomerId,
            CustomerUsername = customer.CustomerUsername,
            CustomerEmail = customer.CustomerEmail,
            CustomerContact = customer.CustomerContact,
            CustomerAddress = customer.CustomerAddress,
            Token = _tokenService.GenerateJwtToken(customer)
        };

        return CreatedAtAction("GetCustomer", new { id = customerDTO.CustomerId }, customerDTO);
    }

    // POST: api/Customers/Login
    [HttpPost("Login")]
    public async Task<ActionResult<CustomerDTO>> LoginCustomer(CustomerDTO_LOGIN Customer)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var customer = await _context.Customers
            .Where(c => c.CustomerUsername == Customer.CustomerUsername)
            .FirstOrDefaultAsync();

        if (customer == null)
        {
            return NotFound();
        }

        if (!customer.VerifyPassword(Customer.CustomerPassword))
        {
            return BadRequest(new { message = "Invalid password" });
        }

        CustomerDTO customerDTO = new()
        {
            CustomerId = customer.CustomerId,
            CustomerUsername = customer.CustomerUsername,
            CustomerEmail = customer.CustomerEmail,
            CustomerContact = customer.CustomerContact,
            CustomerAddress = customer.CustomerAddress,
            Token = _tokenService.GenerateJwtToken(customer)
        };

        return customerDTO;
    }

    // POST: api/Customers/Modify
    [HttpPost("Modify")][Authorize(Roles = "Customer")]
    public async Task<ActionResult<CustomerDTO_PRINT>> ChangePassword(CustomerDTO_MODIFY Customer)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userId = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized();
        }

        var customer = await _context.Customers
            .Where(c => c.CustomerId == Guid.Parse(userId.Value))
            .FirstOrDefaultAsync();

        if (customer == null)
        {
            return Unauthorized();
        }

        if (Customer.NewPassword != null && Customer.NewPassword.Length != 0)
        { 
            switch (Customer.NewPassword)
            {
                // New password must be at least 8 characters
                case string password when password.Length < 8:
                    return BadRequest(new { message = "New password must be at least 8 characters" });
                // New password can contain only letters, numbers, and special characters
                case string password when !PasswRegex().IsMatch(password):
                    return BadRequest(new { message = "New password can contain only letters, numbers, and special characters [!@#$%^&*._-]" });
                // New password must contain at least one letter, one number, and one special character
                case string password when !password.Any(char.IsLetter) || !password.Any(char.IsNumber) || !password.Any(char.IsPunctuation):
                    return BadRequest(new { message = "New password must contain at least one letter, one number, and one special character" });
            }

            customer.CustomerPassword = customer.HashPassword(Customer.NewPassword);
        }

        if (Customer.NewEmail != null && Customer.NewEmail.Length != 0)
        {
            try
            {
                var mailAddress = new System.Net.Mail.MailAddress(Customer.NewEmail);
            }
            catch (FormatException)
            {
                return BadRequest(new { message = "Invalid email" });
            }
        }

        Customer customerModified = new()
        {
            CustomerId = customer.CustomerId,
            CustomerUsername = customer.CustomerUsername,
            CustomerPassword = customer.CustomerPassword,
            CustomerEmail = Customer.NewEmail ?? customer.CustomerEmail,
            CustomerContact = Customer.NewContact ?? customer.CustomerContact,
            CustomerAddress = Customer.NewAddress ?? customer.CustomerAddress,
            CreatedAt = customer.CreatedAt
        };

        try
        {
            _context.Entry(customer).CurrentValues.SetValues(customerModified);
            await _context.SaveChangesAsync();
        }
        catch
        {
            return BadRequest(new { message = "Error modifying customer details" });
        }

        CustomerDTO_PRINT customerDTO = new()
        {
            CustomerId = customerModified.CustomerId,
            CustomerUsername = customerModified.CustomerUsername,
            CustomerEmail = customerModified.CustomerEmail,
            CustomerContact = customerModified.CustomerContact,
            CustomerAddress = customerModified.CustomerAddress
        };

        return customerDTO;
    }

    [GeneratedRegex(@"^[a-zA-Z0-9@._-]+$")]
    private static partial Regex UnameRegex();
    [GeneratedRegex(@"^[a-zA-Z0-9!@#$%^&*._-]+$")]
    private static partial Regex PasswRegex();
}
