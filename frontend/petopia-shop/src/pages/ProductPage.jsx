import React from "react";
import NavbarLayout from "../layout/NavbarLayout";
import Product from "../components/Product";
import { useParams } from "react-router";
import product from "../assets/product_1.webp";

const ProductPage = () => {
  const { category } = useParams();
  return (
    <NavbarLayout>
      <div className="w-full h-full p-8 overflow-x-auto">
        <h1 className="text-2xl font-normal">Dog - Products</h1>
        <div>
          <img
            src={product}
            alt="dummy product"
            className="h-[200px] w-[200px]"
          />
        </div>
      </div>
    </NavbarLayout>
  );
};

export default ProductPage;
