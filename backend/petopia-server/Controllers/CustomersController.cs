using Microsoft.AspNetCore.Mvc;
using petopia_server;
using petopia_server.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

[Route("api/[controller]")]
[ApiController]
public partial class CustomersController(MyDbContext context) : ControllerBase
{
    private readonly MyDbContext _context = context;

    // GET: api/Customers/All
    // [HttpGet("All")]
    public async Task<ActionResult<IEnumerable<CustomerDTO>>> GetCustomers()
    {
        return await _context.Customers
            .Select(c => new CustomerDTO
            {
                CustomerId = c.CustomerId,
                CustomerUsername = c.CustomerUsername,
                CustomerContact = c.CustomerContact,
                CustomerAddress = c.CustomerAddress,
                CreatedAt = c.CreatedAt
            })
            .OrderBy(c => c.CustomerId)
            .ToListAsync();
    }

    // GET: api/Customers/{id}
    // [HttpGet("{id}")]
    public async Task<ActionResult<CustomerDTO>> GetCustomer(int id)
    {
        var Customer = await _context.Customers
            .Select(c => new CustomerDTO
            {
                CustomerId = c.CustomerId,
                CustomerUsername = c.CustomerUsername,
                CustomerContact = c.CustomerContact,
                CustomerAddress = c.CustomerAddress,
                CreatedAt = c.CreatedAt
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

        Customer customer = new()
        {
            CustomerUsername = Customer.CustomerUsername,
            CustomerPassword = Customer.HashPassword(Customer.CustomerPassword),
            CustomerContact = Customer.CustomerContact ?? "",
            CustomerAddress = Customer.CustomerAddress ?? ""
        };

        // Check if username already exists
        var existingCustomer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerUsername == customer.CustomerUsername);
        if (existingCustomer != null)
        {
            return BadRequest(new { message = "Username already exists" });
        }

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
            CustomerContact = customer.CustomerContact,
            CustomerAddress = customer.CustomerAddress,
            CreatedAt = customer.CreatedAt
        };

        return CreatedAtAction("GetCustomer", new { id = customerDTO.CustomerId }, customerDTO);
    }

    // POST: api/Customers/Login
    [HttpPost("Login")]
    public async Task<ActionResult<CustomerDTO>> LoginCustomer(Customer Customer)
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
            CustomerContact = customer.CustomerContact,
            CustomerAddress = customer.CustomerAddress,
            CreatedAt = customer.CreatedAt
        };

        return customerDTO;
    }

    // POST: api/Customers/Modify
    [HttpPost("Modify")]
    public async Task<ActionResult<CustomerDTO>> ChangePassword(CustomerDTO_MODIFY Customer)
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

        if (Customer.NewPassword != null && Customer.NewPassword.Length != 0)
        { 
            // New password checking
            if (Customer.NewPassword == Customer.CustomerPassword)
            {
                return BadRequest(new { message = "New password must be different from the old password" });
            }
            
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

        Customer customerModified = new()
        {
            CustomerId = customer.CustomerId,
            CustomerUsername = customer.CustomerUsername,
            CustomerPassword = customer.CustomerPassword,
            CustomerContact = Customer.CustomerContact ?? customer.CustomerContact,
            CustomerAddress = Customer.CustomerAddress ?? customer.CustomerAddress,
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

        CustomerDTO customerDTO = new()
        {
            CustomerId = customerModified.CustomerId,
            CustomerUsername = customerModified.CustomerUsername,
            CustomerContact = customerModified.CustomerContact,
            CustomerAddress = customerModified.CustomerAddress,
            CreatedAt = customerModified.CreatedAt
        };

        return customerDTO;
    }

    [GeneratedRegex(@"^[a-zA-Z0-9@._-]+$")]
    private static partial Regex UnameRegex();
    [GeneratedRegex(@"^[a-zA-Z0-9!@#$%^&*._-]+$")]
    private static partial Regex PasswRegex();
}