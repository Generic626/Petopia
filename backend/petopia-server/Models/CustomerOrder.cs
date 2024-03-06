using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace petopia_server.Models
{
    public class CustomerOrder
    {
        [StringLength(25)]
        public required string OrderId { get; set; }
        [ForeignKey("CustomerId")]
        public required Guid CustomerId { get; set; }
        public required Customer Customer { get; set; }
        [ForeignKey("ProductId")]
        public required Guid ProductId { get; set; }
        public required Product Product { get; set; }
        public required int OrderedQuantity { get; set; }
        [StringLength(255)]
        public string? OrderStatus { get; set; }
        public DateTime CreatedAt { get; set; } // Datetime is not supported by default in MySQL, make sure to config it in DbContext
    }

    public class CustomerOrderDTO_ORDER
    {
        public required string OrderId { get; set; }
        public CustomerDTO_PRINT? Customer { get; set; }
        public ICollection<ProductDTO_ORDER>? Products { get; set; }
        public string? OrderStatus { get; set; }
        public string? CreatedAt { get; set; }
    }

    public class CustomerOrderDTO_CUSTOMER
    {
        public required string OrderId { get; set; }
        public ICollection<ProductDTO_ORDER>? Products { get; set; }
        public string? OrderStatus { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CustomerOrderDTO_CREATE
    {
        public required ICollection<ProductDTO_CREATE_ORDER> Products { get; set; }
        public string? OrderStatus { get; set; }
    }
}
