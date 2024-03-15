import React from "react";
import OrderTableRow from "./OrderTableRow";

const OrderTable = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-200 text-green-500 border-green-500";
      case "Processing":
        return "bg-yellow-200 text-yellow-400 border-yellow-400";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="mb-6">
      {/* Order Ref + Status */}
      <div className="h-[40px] w-full flex justify-between">
        <span>Order Ref: {order.orderId}</span>
        <span>
          <span
            className={`${getStatusColor(
              order.orderStatus
            )} px-2 py-2 rounded-lg border`}
          >
            • {order.orderStatus}
          </span>
        </span>
      </div>
      <table className="w-full border mb-6">
        <thead>
          {/* The table heading */}
          <tr>
            <th className="p-4 bg-primary text-white ">Product Name</th>
            <th className="p-4 bg-primary text-white">Product Price</th>
            <th className="p-4 bg-primary text-white ">Ordered Quantity</th>
          </tr>
        </thead>
        <tbody>
          {/* The data for the table */}
          {order.products.map((product, index) => (
            <OrderTableRow product={product} key={index} />
          ))}
        </tbody>
      </table>
      {/* Total Price */}
      <span className="font-medium">
        Total Price: HKD${" "}
        {order.products.reduce(
          (acc, item) => acc + item.orderedQuantity * item.productPrice,
          0
        )}
      </span>
    </div>
  );
};

export default OrderTable;
