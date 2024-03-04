import React from "react";

const CartProduct = (props) => {
  return (
    <div className="flex flex-row m-auto p-5 justify-between items-center">
      <div className="flex items-center">
        <img
          src={props.src}
          alt={props.alt}
          className="h-[60px] w-[60px] ring-2 rounded-lg ring-neutral-400"
        />
        <p className="ml-2">{props.name}</p>
      </div>
      <div className="flex items-center">
        <label htmlFor="qty">Quantity: </label>
        <input
          type="number"
          id="qty"
          name="qty"
          min="1"
          defaultValue="1"
          className="w-10"
        ></input>
      </div>
      <div className="flex items-center">
        <p>Price: HK${props.price}</p>
      </div>
    </div>
  );
};

export default CartProduct;