using Microsoft.AspNetCore.Mvc;
using petopia_server;
using petopia_server.Models;
using petopia_server.Helper;
using Microsoft.EntityFrameworkCore;

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
                Category = p.Category == null ? null : new CategoryDTONoProducts
                {
                    CategoryId = p.Category.CategoryId,
                    CategoryName = p.Category.CategoryName,
                    CategoryDescription = p.Category.CategoryDescription
                }
            })
            .OrderBy(p => p.ProductId)
            .ToListAsync();
    }

    // GET: api/Products/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDTO>> GetProduct(int id)
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
    [HttpPost("Create")]
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
            ProductDescription = Product.ProductDescription ?? "",
            ProductPrice = Product.ProductPrice ?? null,
            ProductQuantity = Product.ProductQuantity ?? null,
            ProductKeywords = Product.ProductKeywords ?? "",
            ProductImage = imageName == "" ? null : imageName,
            CategoryId = Product.CategoryId ?? null
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
            Category = product.Category == null ? null : new CategoryDTONoProducts
            {
                CategoryId = product.Category.CategoryId,
                CategoryName = product.Category.CategoryName,
                CategoryDescription = product.Category.CategoryDescription
            }
        };

        return CreatedAtAction("GetProduct", new { id = productDTO.ProductId }, productDTO);
    }
}
