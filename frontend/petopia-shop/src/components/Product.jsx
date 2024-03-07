import React from "react";
import { useNavigate } from "react-router";

const Product = (props) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/product-detail");
  };
  const product = props.product;
  return (
    <div
      className="w-1/4 flex flex-col items-center cursor-pointer"
      onClick={handleOnClick}
    >
      <div className="duration-100 ease-linear hover:border-primary border-[2px] border-transparent rounded-lg flex flex-col items-center p-2">
        {/* Product Image */}
        <img
          src={product.productImage}
          alt="dummy product"
          className="h-[200px] w-[200px]"
        />
        {/* Product Name */}
        <span className="font-semibold">{product.productName}</span>
        {/* Product Price */}
        <span>HKD${product.productPrice}</span>
      </div>
    </div>
  );
};

export default Product;
