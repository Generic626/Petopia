import React from "react";
import { useNavigate } from "react-router";
import { getUser } from "../functions/user-management";
import DeleteProductButton from "./DeleteProductButton";

const Product = (props) => {
  const navigate = useNavigate();

  const product = props.product;
  const user = getUser();

  const handleOnClick = () => {
    navigate(`/product-detail/${product.productId}`);
  };

  return (
    <div
      className="w-1/4 flex flex-col items-center cursor-pointer"
      onClick={handleOnClick}
    >
      <div className="relative duration-100 ease-linear group hover:border-primary border-[2px] border-transparent rounded-lg flex flex-col items-center p-2">
        {user.role == "admin" && (
          <DeleteProductButton
            triggerModal={props.triggerModal}
            product={product}
          />
        )}
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
