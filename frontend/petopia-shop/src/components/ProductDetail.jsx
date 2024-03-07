import React, { useRef } from "react";

const ProductDetail = (props) => {
  const quantityOptions = Array.from(
    { length: props.stock },
    (_, index) => index + 1
  );

  const selectRef = useRef();

  const handleClick = () => {
    selectRef.current.click();
  };

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
          <div
            className="ring-2 ring-neutral-400 rounded-full p-3 bg-white flex justify-center items-center mb-5 mt-10 cursor-pointer"
            onClick={handleClick}
          >
            <span className="mr-4">Quantity:</span>
            <select
              value={props.quantity}
              onChange={props.handleQuantityChange}
              ref={selectRef}
            >
              {quantityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={props.handleAddToCart}
            className="bg-primary rounded-full p-3 text-white w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
