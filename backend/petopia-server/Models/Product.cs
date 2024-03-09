using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;

namespace petopia_server.Models
{
    public class Product: BaseModel
    {
        [Key][DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid ProductId { get; set; } = Guid.NewGuid();
        [StringLength(255)]
        public required string ProductName { get; set; }
        [StringLength(255)]
        public string? ProductDescription { get; set; }
        public decimal? ProductPrice { get; set; }
        public int? ProductQuantity { get; set; }
        [StringLength(255)]
        public string? ProductKeywords { get; set; }
        [StringLength(255)]
        public string? ProductImage { get; set; }
        [ForeignKey("CategoryId")]
        public Guid? CategoryId { get; set; }
        public Category? Category { get; set; }
    }

    public class ProductDTO_FORM_CREATE
    {
        [StringLength(255)][FromForm(Name = "productName")]
        public required string ProductName { get; set; }
        [StringLength(255)][FromForm(Name = "productDescription")]
        public string? ProductDescription { get; set; }
        [FromForm(Name = "productPrice")]
        public decimal? ProductPrice { get; set; }
        [FromForm(Name = "productQuantity")]
        public int? ProductQuantity { get; set; }
        [StringLength(255)][FromForm(Name = "productKeywords")]
        public string? ProductKeywords { get; set; }
        [FromForm(Name = "productImage")]
        public IFormFile? ProductImage { get; set; }
        [FromForm(Name = "categoryId")]
        public Guid? CategoryId { get; set; }
    }

    public class ProductDTO
    {
        public Guid ProductId { get; set; }
        public required string ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public decimal? ProductPrice { get; set; }
        public int? ProductQuantity { get; set; }
        public string? ProductKeywords { get; set; }
        public string? ProductImage { get; set; }
        public CategoryDTONoProducts? Category { get; set; }
    }

    public class ProductDTONoCategory
    {
        public Guid ProductId { get; set; }
        public required string ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public decimal? ProductPrice { get; set; }
        public int? ProductQuantity { get; set; }
        public string? ProductKeywords { get; set; }
        public string? ProductImage { get; set; }
    }

    public class ProductDTO_CREATE_ORDER
    {
        public Guid ProductId { get; set; }
        public required int OrderedQuantity { get; set; }
    }

    public class ProductDTO_ORDER
    {
        public Guid ProductId { get; set; }
        public required string ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public decimal? ProductPrice { get; set; }
        public int? OrderedQuantity { get; set; }
        public string? ProductKeywords { get; set; }
        public string? ProductImage { get; set; }
        public CategoryDTONoProducts? Category { get; set; }
    }
}
