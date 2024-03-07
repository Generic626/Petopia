import React, { useState } from "react";
import NavbarLayout from "../layout/NavbarLayout";
import ProductDetail from "../components/ProductDetail";
import Product1 from "../assets/product_1.webp";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
  };

  return (
    <NavbarLayout>
      <div className="h-screen">
        <ProductDetail
          stock={10}
          productName="Food 1"
          src={Product1}
          alt="Food 1"
          description="Tuna: Excellent choice for a high quality protein and low-fat fish. Rich in Omega-3 (EPA & DHA), helps neural, brain, retinal and foetal development with addition to improve skin and coat condition. Mousse texture: Suitable for cats & dogs that have difficulty in chewing solid food. And it is convenient to mix and feed with dry food and supplement. Halal certified"
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </NavbarLayout>
  );
};

export default ProductDetailPage;
