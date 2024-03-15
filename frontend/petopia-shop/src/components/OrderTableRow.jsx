import React, { useRef } from "react";

const OrderTableRow = ({ product }) => {
  console.log(product);
  return (
    <tr>
      <td className="p-4">{product.productName}</td>
      <td className="p-4">HK${product.productPrice}</td>
      <td className="p-4">{product.orderedQuantity}</td>
    </tr>
  );
};

export default OrderTableRow;
