using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace petopia_server.Models
{
    public class Category: BaseModel
    {
        [Key][DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid CategoryId { get; set; } = Guid.NewGuid();
        [StringLength(255)]
        public required string CategoryName { get; set; }
        [StringLength(255)]
        public string? CategoryDescription { get; set; }
        public ICollection<Product>? Products { get; set; }
    }

    public class CategoryDTO
    {
        public Guid CategoryId { get; set; }
        public required string CategoryName { get; set; }
        public string? CategoryDescription { get; set; }
        public ICollection<ProductDTONoCategory>? Products { get; set; }
    }

    public class CategoryDTONoProducts
    {
        public Guid CategoryId { get; set; }
        public required string CategoryName { get; set; }
        public string? CategoryDescription { get; set; }
    }
}
