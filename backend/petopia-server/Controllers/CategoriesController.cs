using Microsoft.AspNetCore.Mvc;
using petopia_server;
using petopia_server.Models;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController(MyDbContext context) : ControllerBase
{
    private readonly MyDbContext _context = context;

    // GET: api/Categories/All
    [HttpGet("All")]
    public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetCategories()
    {
        return await _context.Categories
            .Select(c => new CategoryDTO
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName,
                CategoryDescription = c.CategoryDescription,
                Products = c.Products == null ? null : c.Products.Select(p => new ProductDTONoCategory
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    ProductDescription = p.ProductDescription,
                    ProductPrice = p.ProductPrice,
                    ProductQuantity = p.ProductQuantity,
                    ProductKeywords = p.ProductKeywords
                })
                .OrderBy(p => p.ProductId)
                .ToList()
            })
            .OrderBy(c => c.CategoryId)
            .ToListAsync();
    }

    // GET: api/Categories/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryDTO>> GetCategory(int id)
    {
        var Category = await _context.Categories
            .Select(c => new CategoryDTO
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName,
                CategoryDescription = c.CategoryDescription,
                Products = c.Products == null ? null : c.Products.Select(p => new ProductDTONoCategory
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    ProductDescription = p.ProductDescription,
                    ProductPrice = p.ProductPrice,
                    ProductQuantity = p.ProductQuantity,
                    ProductKeywords = p.ProductKeywords
                })
                .OrderBy(p => p.ProductId)
                .ToList()
            })
            .FirstOrDefaultAsync(c => c.CategoryId == id);

        if (Category == null)
        {
            return NotFound();
        }

        return Category;
    }

    // POST: api/Categories/Create
    [HttpPost("Create")]
    public async Task<ActionResult<CategoryDTO>> PostCategory(Category Category)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        Category category = new()
        {
            CategoryName = Category.CategoryName,
            CategoryDescription = Category.CategoryDescription ?? ""
        };

        var existingCategory = await _context.Categories.FirstOrDefaultAsync(c => c.CategoryName == category.CategoryName);
        if (existingCategory != null)
        {
            return BadRequest(new { message = "Category already exists" });
        }

        try
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }
        catch
        {
            return BadRequest(new { message = "Error creating category" });
        }

        CategoryDTO categoryDTO = new()
        {
            CategoryId = category.CategoryId,
            CategoryName = category.CategoryName,
            CategoryDescription = category.CategoryDescription
        };

        return CreatedAtAction("GetCategory", new { id = categoryDTO.CategoryId }, categoryDTO);
    }
}
