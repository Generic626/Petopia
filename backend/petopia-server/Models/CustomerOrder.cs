using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace petopia_server.Models
{
    public class CustomerOrder
    {
        public int OrderId { get; set; }
        [ForeignKey("CustomerId")]
        public required int CustomerId { get; set; }
        public required Customer Customer { get; set; }
        [ForeignKey("ProductId")]
        public required int ProductId { get; set; }
        public required Product Product { get; set; }
        public required int OrderedQuantity { get; set; }
        [StringLength(255)]
        public string? OrderStatus { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CustomerOrderDTO_ORDER
    {
        public int OrderId { get; set; }
        public CustomerDTO? Customer { get; set; }
        public ICollection<ProductDTO_ORDER>? Products { get; set; }
        public string? OrderStatus { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CustomerOrderDTO_CUSTOMER
    {
        public int OrderId { get; set; }
        public ICollection<ProductDTO_ORDER>? Products { get; set; }
        public string? OrderStatus { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CustomerOrderDTO_CREATE
    {
        public required int CustomerId { get; set; }
        public required ICollection<ProductDTO_CREATE_ORDER> Products { get; set; }
        public string? OrderStatus { get; set; }
    }
}
