using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;

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
        [StringLength(255)]
        public string? ProductImage { get; set; }
        [ForeignKey("CategoryId")]
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }
    }

    public class ProductDTO_FORM_CREATE
    {
        [FromForm(Name = "productName")]
        public required string ProductName { get; set; }
        [FromForm(Name = "productDescription")]
        public string? ProductDescription { get; set; }
        [FromForm(Name = "productPrice")]
        public decimal? ProductPrice { get; set; }
        [FromForm(Name = "productQuantity")]
        public int? ProductQuantity { get; set; }
        [FromForm(Name = "productKeywords")]
        public string? ProductKeywords { get; set; }
        [FromForm(Name = "productImage")]
        public IFormFile? ProductImage { get; set; }
        [FromForm(Name = "categoryId")]
        public int? CategoryId { get; set; }
    }

    public class ProductDTO
    {
        public int ProductId { get; set; }
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
        public int ProductId { get; set; }
        public required string ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public decimal? ProductPrice { get; set; }
        public int? ProductQuantity { get; set; }
        public string? ProductKeywords { get; set; }
        public string? ProductImage { get; set; }
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
        public string? ProductImage { get; set; }
        public CategoryDTONoProducts? Category { get; set; }
    }
}
