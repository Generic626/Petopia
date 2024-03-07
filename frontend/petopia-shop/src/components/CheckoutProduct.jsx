import React from "react";
import { AiFillDelete } from "react-icons/ai";
import TrashButton from "./UI/TrashButton";

const CheckoutProduct = (props) => {
  return (
    <div className="flex flex-row m-auto p-5 place-content-evenly items-center ">
      <TrashButton />
      <img
        src={props.src}
        alt={props.alt}
        className="h-[60px] w-[60px] ring-2 rounded-lg ring-neutral-400"
      />
      <p>{props.name}</p>
      <label for="qty">Quantity: </label>
      <input
        type="number"
        id="qty"
        name="qty"
        min="1"
        defaultValue="1"
        className=" w-10"
      ></input>
      <p>HK${props.price}</p>
    </div>
  );
};

export default CheckoutProduct;
