import React, { useEffect, useState } from "react";
import NavbarLayout from "../layout/NavbarLayout";
import ProductDetail from "../components/ProductDetail";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { requestHeader } from "../functions/authentication-header";
import useSnackbar from "../hook/useSnackbar";
import { getUser } from "../functions/user-management.js";
import { addToCart } from "../functions/cart-management.js";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { setError, setWarning, setSuccess } = useSnackbar();
  const navigate = useNavigate();

  const header = requestHeader({ "Content-Type": "application/json" });
  const user = getUser();

  // used for keep track of user's state
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  // get product by productId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5290/api/products/${productId}`
        );

        if (response.data.productQuantity == 0) {
          setQuantity(0);
        }

        setProduct(response.data);
      } catch (error) {
        setError((prev) => [...prev, "Something wrong with reading product"]);
        navigate("/product/dog");
      }
    };
    fetchData();
  }, [productId]);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = (event) => {
    event.preventDefault();

    // if user is not logged in
    if (user.role == null) {
      setWarning((prev) => [...prev, "You have to sign in to add product"]);
    } else {
      // else add product to cart

      // create cart item payload to be stored
      const payload = {
        productId: productId,
        orderedQuantity: quantity,
        productPrice: product.productPrice,
      };
      addToCart(payload);
      setSuccess((prev) => [...prev, `Add ${product.productName} to cart`]);
    }
  };

  return (
    <NavbarLayout>
      <div className="h-screen">
        <ProductDetail
          stock={product.productQuantity}
          productName={product.productName}
          src={product.productImage}
          alt={product.productName || "Product"}
          description={product.productDescription}
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
          handleAddToCart={handleAddToCart}
          price={product.productPrice}
        />
      </div>
    </NavbarLayout>
  );
};

export default ProductDetailPage;
