using System.ComponentModel.DataAnnotations;

namespace petopia_server.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        [StringLength(255)]
        public required string CategoryName { get; set; }
        [StringLength(255)]
        public string? CategoryDescription { get; set; }
        public ICollection<Product>? Products { get; set; }
    }

    public class CategoryDTO
    {
        public int CategoryId { get; set; }
        public required string CategoryName { get; set; }
        public string? CategoryDescription { get; set; }
        public ICollection<ProductDTONoCategory>? Products { get; set; }
    }

    public class CategoryDTONoProducts
    {
        public int CategoryId { get; set; }
        public required string CategoryName { get; set; }
        public string? CategoryDescription { get; set; }
    }
}
