import React from "react";
import CartProduct from "./CartProduct";
import { useEffect, useState } from "react";
import axios from "axios";

const CartRow = (props) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5290/api/products/${props.item.productId}`
        );

        setProduct(response.data);
      } catch (error) {
        setError((prev) => [...prev, "Something wrong with reading cart"]);
        navigate("/product/dog");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="border border-neutral-400 rounded-lg overflow-hidden p-2 mb-4 bg-white">
      <CartProduct
        product={product}
        qty={props.item.orderedQuantity}
        triggerModal={props.triggerModal}
      />
    </div>
  );
};

export default CartRow;
