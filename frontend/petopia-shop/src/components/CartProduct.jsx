import React, { useState } from "react";
import TrashButton from "./UI/TrashButton";
import { updateCart } from "../functions/cart-management";

const CartProduct = ({ product, qty, triggerModal }) => {
  const [quantity, setQuantity] = useState(qty);

  const quantityOptions = Array.from(
    { length: product.productQuantity },
    (_, index) => index + 1
  );

  const handleQuantityChange = (event) => {
    const payload = {
      productId: product.productId,
      orderedQuantity: parseInt(event.target.value),
    };
    updateCart(payload);
    setQuantity(parseInt(event.target.value));

    window.location.reload();
  };

  const handleDeleteItem = (e) => {
    triggerModal(e, product);
  };

  return (
    <div className="flex flex-row m-auto p-5 justify-between items-center">
      {/* Trashcan Button */}
      <TrashButton triggerModal={handleDeleteItem} />
      {/* Product Image */}
      <div className="flex items-center">
        <img
          src={product.productImage}
          alt={product.productName}
          className="h-[60px] w-[60px] ring-2 rounded-lg ring-neutral-400"
        />
        <p className="ml-2">{product.productName}</p>
      </div>
      {/* Quanity Selection */}
      <div className="flex items-center">
        <label htmlFor="qty">Quantity: </label>
        <select value={quantity} onChange={handleQuantityChange}>
          {quantityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {/* Price Information */}
      <div className="flex items-center">
        <p>Price: HK${product.productPrice * quantity}</p>
      </div>
    </div>
  );
};

export default CartProduct;
