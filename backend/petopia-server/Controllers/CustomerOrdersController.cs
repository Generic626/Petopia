using Microsoft.AspNetCore.Mvc;
using petopia_server;
using petopia_server.Models;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class CustomerOrdersController(MyDbContext context) : ControllerBase
{
    private readonly MyDbContext _context = context;

    // GET: api/CustomerOrders/Order/{id}
    [HttpGet("Order/{id}")]
    public async Task<ActionResult<CustomerOrderDTO_ORDER>> GetCustomerOrder(int id)
    {
        var customerOrder = await _context.CustomerOrders.Where(c => c.OrderId == id).ToListAsync();

        if (customerOrder.Count == 0)
        {
            return NotFound();
        }

        // Get customer
        var customer = await _context.Customers
            .Select(c => new CustomerDTO
            {
                CustomerId = c.CustomerId,
                CustomerUsername = c.CustomerUsername,
                CustomerContact = c.CustomerContact,
                CustomerAddress = c.CustomerAddress,
                CreatedAt = c.CreatedAt
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
                Category = c.Product.Category == null ? null : new CategoryDTONoProducts
                {
                    CategoryId = c.Product.Category.CategoryId,
                    CategoryName = c.Product.Category.CategoryName,
                    CategoryDescription = c.Product.Category.CategoryDescription
                }
            })
            .OrderBy(c => c.ProductId)
            .ToListAsync();

        // Create the DTO
        var customerOrderDTO = new CustomerOrderDTO_ORDER
        {
            OrderId = customerOrder[0].OrderId,
            Customer = customer,
            Products = products,
            OrderStatus = customerOrder[0].OrderStatus,
            CreatedAt = customerOrder[0].CreatedAt
        };

        return customerOrderDTO;
    }

    // GET: api/CustomerOrders/Customer/{id}
    [HttpGet("Customer/{id}")]
    public async Task<ActionResult<IEnumerable<CustomerOrderDTO_CUSTOMER>>> GetCustomerOrders(int id)
    {
        // Get orders
        var customerOrders = await _context.CustomerOrders
            .Where(c => c.CustomerId == id)
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
                    Category = c.Product.Category == null ? null : new CategoryDTONoProducts
                    {
                        CategoryId = c.Product.Category.CategoryId,
                        CategoryName = c.Product.Category.CategoryName,
                        CategoryDescription = c.Product.Category.CategoryDescription
                    }
                })
                .OrderBy(c => c.ProductId)
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
    [HttpPost("Create")]
    public async Task<ActionResult<CustomerOrderDTO_ORDER>> PostCustomerOrders(CustomerOrderDTO_CREATE customerOrder)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Check if customer exists
        var customerExists = await _context.Customers.FindAsync(customerOrder.CustomerId);
        if (customerExists == null)
        {
            return BadRequest(new { message = "Customer does not exist" });
        }

        if (customerOrder.Products == null || customerOrder.Products.Count == 0)
        {
            return BadRequest(new { message = "Products must be provided" });
        }

        // Set the next OrderId
        var notEmpty = await _context.CustomerOrders.AnyAsync();
        var largestOrderId = notEmpty ? await _context.CustomerOrders.MaxAsync(c => c.OrderId) : 0;
        var nextOrderId = largestOrderId + 1;

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
                OrderStatus = customerOrder.OrderStatus,
                CreatedAt = DateTime.Now
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
            Customer = new CustomerDTO
            {
                CustomerId = customerExists.CustomerId,
                CustomerUsername = customerExists.CustomerUsername,
                CustomerContact = customerExists.CustomerContact,
                CustomerAddress = customerExists.CustomerAddress,
                CreatedAt = customerExists.CreatedAt
            },
            Products = [.. productExistsList.Select(c => new ProductDTO_ORDER
            {
                ProductId = c.ProductId,
                ProductName = c.ProductName,
                ProductDescription = c.ProductDescription,
                ProductPrice = c.ProductPrice,
                OrderedQuantity = customerOrder.Products.First(p => p.ProductId == c.ProductId).OrderedQuantity,
                ProductKeywords = c.ProductKeywords,
                Category = c.Category == null ? null : new CategoryDTONoProducts
                {
                    CategoryId = c.Category.CategoryId,
                    CategoryName = c.Category.CategoryName,
                    CategoryDescription = c.Category.CategoryDescription
                }
            })
            .OrderBy(c => c.ProductId)],
            OrderStatus = customerOrder.OrderStatus,
            CreatedAt = DateTime.Now
        };

        return CreatedAtAction("GetCustomerOrder", new { id = nextOrderId }, customerOrderDTO);
    }
}
