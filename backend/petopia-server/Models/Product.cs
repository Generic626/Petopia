using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace petopia_server.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [StringLength(255)]
        public required string ProductName { get; set; }
        [StringLength(255)]
        public string? ProductDescription { get; set; }
        public decimal? ProductPrice { get; set; }
        public int? ProductQuantity { get; set; }
        [StringLength(255)]
        public string? ProductKeywords { get; set; }
        [ForeignKey("CategoryId")]
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }
    }

    public class ProductDTO
    {
        public int ProductId { get; set; }
        public required string ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public decimal? ProductPrice { get; set; }
        public int? ProductQuantity { get; set; }
        public string? ProductKeywords { get; set; }
        public CategoryDTONoProducts? Category { get; set; }
    }

    public class ProductDTONoCategory
    {
        public int ProductId { get; set; }
        public required string ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public decimal? ProductPrice { get; set; }
        public int? ProductQuantity { get; set; }
        public string? ProductKeywords { get; set; }
    }

    public class ProductDTO_CREATE_ORDER
    {
        public int ProductId { get; set; }
        public required int OrderedQuantity { get; set; }
    }

    public class ProductDTO_ORDER
    {
        public int ProductId { get; set; }
        public required string ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public decimal? ProductPrice { get; set; }
        public int? OrderedQuantity { get; set; }
        public string? ProductKeywords { get; set; }
        public CategoryDTONoProducts? Category { get; set; }
    }
}
