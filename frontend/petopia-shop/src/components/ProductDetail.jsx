import React from "react";
import { getUser } from "../functions/user-management";

const ProductDetail = (props) => {
  const quantityOptions = Array.from(
    { length: props.stock },
    (_, index) => index + 1
  );

  const user = getUser();

  return (
    <div className="text-left grid grid-cols-2 gap-x-16 items-start mx-60 my-20 ">
      {/* Product Title + Image */}
      <div className="col-span-2 mb-4">
        <h1 className="text-[36px] font-semibold">{props.productName}</h1>
      </div>
      <div className="col-span-1">
        <img
          src={props.src}
          alt={props.alt}
          className="ring-2 rounded-lg ring-neutral-400 col-span-1"
        />
      </div>
      {/* Product Details */}
      <div className="col-span-1 flex flex-col ">
        <p className="break-words text-lg">{props.description}</p>

        {/* Button Groups */}
        <div className="w-full">
          <div className="ring-2 ring-neutral-400 rounded-full p-3 bg-white flex justify-center items-center mb-5 mt-10 cursor-pointer">
            {Number(props.quantity) <= 0 ? (
              <span>Out Of Stock</span>
            ) : (
              <span className="mr-4">Quantity:</span>
            )}

            {Number(props.quantity) > 0 && (
              <select
                value={props.quantity}
                onChange={props.handleQuantityChange}
              >
                {quantityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
          {user.role != "admin" && (
            <button
              onClick={props.handleAddToCart}
              className={`bg-primary rounded-full p-3 text-white w-full ${
                Number(props.quantity) <= 0 && "cursor-not-allowed"
              }`}
              disabled={Number(props.quantity) <= 0}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
