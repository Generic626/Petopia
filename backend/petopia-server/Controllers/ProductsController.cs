using Microsoft.AspNetCore.Mvc;
using petopia_server;
using petopia_server.Models;
using petopia_server.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
public class ProductsController(MyDbContext context, UrlHelper urlHelper) : ControllerBase
{
    private readonly MyDbContext _context = context;
    private readonly UrlHelper _urlHelper = urlHelper;

    // GET: api/Products/All
    [HttpGet("All")]
    public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProducts()
    {
        return await _context.Products
            .Select(p => new ProductDTO
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                ProductDescription = p.ProductDescription,
                ProductPrice = p.ProductPrice,
                ProductQuantity = p.ProductQuantity,
                ProductKeywords = p.ProductKeywords,
                ProductImage = _urlHelper.GetImageFullPath(p.ProductImage),
                CreatedAt = p.CreatedAt,
                Category = p.Category == null ? null : new CategoryDTONoProducts
                {
                    CategoryId = p.Category.CategoryId,
                    CategoryName = p.Category.CategoryName,
                    CategoryDescription = p.Category.CategoryDescription
                }
            })
            .OrderBy(p => p.ProductName)
            .ToListAsync();
    }

    // GET: api/Products/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDTO>> GetProduct(Guid id)
    {
        var Product = await _context.Products
            .Select(p => new ProductDTO
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                ProductDescription = p.ProductDescription,
                ProductPrice = p.ProductPrice,
                ProductQuantity = p.ProductQuantity,
                ProductKeywords = p.ProductKeywords,
                ProductImage = _urlHelper.GetImageFullPath(p.ProductImage),
                CreatedAt = p.CreatedAt,
                Category = p.Category == null ? null : new CategoryDTONoProducts
                {
                    CategoryId = p.Category.CategoryId,
                    CategoryName = p.Category.CategoryName,
                    CategoryDescription = p.Category.CategoryDescription
                }
            })
            .FirstOrDefaultAsync(p => p.ProductId == id);

        if (Product == null)
        {
            return NotFound();
        }

        return Product;
    }

    // POST: api/Products/Create
    [HttpPost("Create")][Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductDTO>> CreateProduct([FromForm] ProductDTO_FORM_CREATE Product)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var imageName = "";

        // Save image to server
        if (Product.ProductImage != null)
        {
            var image = Product.ProductImage;
            var imagePath = "";
            do
            {
                imageName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", imageName);
            } while (System.IO.File.Exists(imagePath));
            using var fileStream = new FileStream(imagePath, FileMode.Create);
            await image.CopyToAsync(fileStream);
        }

        Product product = new()
        {
            ProductName = Product.ProductName,
            ProductDescription = Product.ProductDescription,
            ProductPrice = Product.ProductPrice,
            ProductQuantity = Product.ProductQuantity,
            ProductKeywords = Product.ProductKeywords,
            ProductImage = imageName == "" ? null : imageName,
            CategoryId = Product.CategoryId
        };

        if (product.CategoryId != null) {
            var category = await _context.Categories.FindAsync(product.CategoryId);
            if (category == null) {
                return BadRequest(new { message = "Category does not exist" });
            }
        }

        var existingProduct = await _context.Products.FirstOrDefaultAsync(p => p.ProductName == product.ProductName);
        if (existingProduct != null)
        {
            return BadRequest(new { message = "Product already exists" });
        }

        try
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }
        catch
        {
            return BadRequest(new { message = "Error creating product" });
        }

        ProductDTO productDTO = new()
        {
            ProductId = product.ProductId,
            ProductName = product.ProductName,
            ProductDescription = product.ProductDescription,
            ProductPrice = product.ProductPrice,
            ProductQuantity = product.ProductQuantity,
            ProductKeywords = product.ProductKeywords,
            ProductImage = _urlHelper.GetImageFullPath(product.ProductImage),
            CreatedAt = product.CreatedAt,
            Category = product.Category == null ? null : new CategoryDTONoProducts
            {
                CategoryId = product.Category.CategoryId,
                CategoryName = product.Category.CategoryName,
                CategoryDescription = product.Category.CategoryDescription
            }
        };

        return CreatedAtAction("GetProduct", new { id = productDTO.ProductId }, productDTO);
    }

    // POST: api/Products/Remove/{id}
    [HttpPost("Remove/{id}")][Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductDTO>> RemoveProduct(Guid id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound();
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent(); // 204 No Content
    }
}
