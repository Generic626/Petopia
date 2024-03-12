using Microsoft.AspNetCore.Mvc;
using petopia_server;
using petopia_server.Models;
using petopia_server.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
public class CustomerOrdersController(MyDbContext context, UrlHelper urlHelper) : ControllerBase
{
    private readonly MyDbContext _context = context;
    private readonly UrlHelper _urlHelper = urlHelper;

    // GET: api/CustomerOrders/Order/{id}
    [HttpGet("Order/{id}")]
    public async Task<ActionResult<CustomerOrderDTO_ORDER>> GetCustomerOrder(string id)
    {
        var customerOrder = await _context.CustomerOrders.Where(c => c.OrderId == id).ToListAsync();

        if (customerOrder.Count == 0)
        {
            return NotFound();
        }

        // Get customer
        var customer = await _context.Customers
            .Select(c => new CustomerDTO_PRINT
            {
                CustomerId = c.CustomerId,
                CustomerUsername = c.CustomerUsername,
                CustomerEmail = c.CustomerEmail,
                CustomerContact = c.CustomerContact,
                CustomerAddress = c.CustomerAddress,
            }).FirstOrDefaultAsync(c => c.CustomerId == customerOrder[0].CustomerId);

        // Get products
        var products = await _context.CustomerOrders
            .Where(c => c.OrderId == id)
            .Select(c => new ProductDTO_ORDER
            {
                ProductId = c.ProductId,
                ProductName = c.Product.ProductName,
                ProductDescription = c.Product.ProductDescription,
                ProductPrice = c.Product.ProductPrice,
                OrderedQuantity = c.OrderedQuantity,
                ProductKeywords = c.Product.ProductKeywords,
                ProductImage = _urlHelper.GetImageFullPath(c.Product.ProductImage),
                Category = c.Product.Category == null ? null : new CategoryDTONoProducts
                {
                    CategoryId = c.Product.Category.CategoryId,
                    CategoryName = c.Product.Category.CategoryName,
                    CategoryDescription = c.Product.Category.CategoryDescription
                }
            })
            .OrderBy(c => c.ProductName)
            .ToListAsync();

        // Create the DTO
        var customerOrderDTO = new CustomerOrderDTO_ORDER
        {
            OrderId = customerOrder[0].OrderId,
            Customer = customer,
            Products = products,
            OrderStatus = customerOrder[0].OrderStatus,
            CreatedAt = customerOrder[0].CreatedAt.ToString("yyyy-MM-ddTHH:mm:ss")
        };

        return customerOrderDTO;
    }

    // GET: api/CustomerOrders/Customer/{id}
    [HttpGet("Customer/{id}")]
    public async Task<ActionResult<IEnumerable<CustomerOrderDTO_CUSTOMER>>> GetCustomerOrders(string id)
    {
        // Get orders
        var customerOrders = await _context.CustomerOrders
            .Where(c => c.CustomerId.ToString() == id)
            .GroupBy(c => c.OrderId)
            .Select(g => g.First())
            .ToListAsync();

        // Define return list
        IEnumerable<CustomerOrderDTO_CUSTOMER> customerOrderDTOs = [];

        // Get products of each order
        foreach(var order in customerOrders)
        {
            var products = await _context.CustomerOrders
                .Where(c => c.OrderId == order.OrderId)
                .Select(c => new ProductDTO_ORDER
                {
                    ProductId = c.ProductId,
                    ProductName = c.Product.ProductName,
                    ProductDescription = c.Product.ProductDescription,
                    ProductPrice = c.Product.ProductPrice,
                    OrderedQuantity = c.OrderedQuantity,
                    ProductKeywords = c.Product.ProductKeywords,
                    ProductImage = _urlHelper.GetImageFullPath(c.Product.ProductImage),
                    Category = c.Product.Category == null ? null : new CategoryDTONoProducts
                    {
                        CategoryId = c.Product.Category.CategoryId,
                        CategoryName = c.Product.Category.CategoryName,
                        CategoryDescription = c.Product.Category.CategoryDescription
                    }
                })
                .OrderBy(c => c.ProductName)
                .ToListAsync();

            // Create the DTO
            var customerOrderDTO = new CustomerOrderDTO_CUSTOMER
            {
                OrderId = order.OrderId,
                Products = products,
                OrderStatus = order.OrderStatus,
                CreatedAt = order.CreatedAt
            };

            // Insert into return list
            customerOrderDTOs = customerOrderDTOs.Append(customerOrderDTO);
        }

        return Ok(customerOrderDTOs);
    }

    // POST: api/CustomerOrders/Create
    [HttpPost("Create")][Authorize(Roles = "Customer")]
    public async Task<ActionResult<CustomerOrderDTO_ORDER>> PostCustomerOrders(CustomerOrderDTO_CREATE customerOrder)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Check if customer exists
        var userId = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized();
        }

        var customerExists = await _context.Customers
            .Where(c => c.CustomerId == Guid.Parse(userId.Value))
            .FirstOrDefaultAsync();

        if (customerExists == null)
        {
            return Unauthorized();
        }

        if (customerOrder.Products == null || customerOrder.Products.Count == 0)
        {
            return BadRequest(new { message = "Products must be provided" });
        }

        var currentTime = DateTime.Now.ToString("yyyyMMddHHmmss");
        var newGuid = Guid.NewGuid().ToString().Split('-')[0]; // Get the first part of the GUID
        var nextOrderId = $"{newGuid}{currentTime}";

        // Create a list to save the products
        IEnumerable<Product> productExistsList = [];

        foreach (var product in customerOrder.Products)
        {
            // Check if product exists
            var productExists = await _context.Products.FindAsync(product.ProductId);
            if (productExists == null)
            {
                return BadRequest(new { message = $"Product with id {product.ProductId} does not exist" });
            }

            if (product.OrderedQuantity < 1)
            {
                return BadRequest(new { message = "Product quantity must be at least 1" });
            }

            productExists.Category = await _context.Categories.FindAsync(productExists.CategoryId);

            CustomerOrder newCustomerOrder = new()
            {
                OrderId = nextOrderId,
                CustomerId = customerExists.CustomerId,
                Customer = customerExists,
                ProductId = productExists.ProductId,
                Product = productExists,
                OrderedQuantity = product.OrderedQuantity,
                OrderStatus = customerOrder.OrderStatus
            };

            try
            {
                _context.CustomerOrders.Add(newCustomerOrder);
            }
            catch
            {
                return BadRequest(new { message = "Error adding customer orders" });
            }

            productExistsList = productExistsList.Append(productExists).ToList();
        }

        try
        {
            await _context.SaveChangesAsync();
        }
        catch
        {
            return BadRequest(new { message = "Error saving customer orders" });
        }

        CustomerOrderDTO_ORDER customerOrderDTO = new()
        {
            OrderId = nextOrderId,
            Customer = new CustomerDTO_PRINT
            {
                CustomerId = customerExists.CustomerId,
                CustomerUsername = customerExists.CustomerUsername,
                CustomerEmail = customerExists.CustomerEmail,
                CustomerContact = customerExists.CustomerContact,
                CustomerAddress = customerExists.CustomerAddress
            },
            Products = [.. productExistsList.Select(c => new ProductDTO_ORDER
            {
                ProductId = c.ProductId,
                ProductName = c.ProductName,
                ProductDescription = c.ProductDescription,
                ProductPrice = c.ProductPrice,
                OrderedQuantity = customerOrder.Products.First(p => p.ProductId == c.ProductId).OrderedQuantity,
                ProductKeywords = c.ProductKeywords,
                ProductImage = _urlHelper.GetImageFullPath(c.ProductImage),
                Category = c.Category == null ? null : new CategoryDTONoProducts
                {
                    CategoryId = c.Category.CategoryId,
                    CategoryName = c.Category.CategoryName,
                    CategoryDescription = c.Category.CategoryDescription
                }
            })
            .OrderBy(c => c.ProductName)],
            OrderStatus = customerOrder.OrderStatus,
            CreatedAt = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss")
        };

        return CreatedAtAction("GetCustomerOrder", new { id = nextOrderId }, customerOrderDTO);
    }
}
