import React, { useEffect, useRef, useState } from "react";
import NavbarLayout from "../layout/NavbarLayout";
import CartRow from "../components/CartRow";
import {
  readFromCart,
  removeFromCart,
  resetCart,
} from "../functions/cart-management.js";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router";
import useSnackbar from "../hook/useSnackbar.js";
import axios from "axios";
import { requestHeader } from "../functions/authentication-header.js";

const UserCartPage = () => {
  const [cart, setCart] = useState(readFromCart());
  const navigate = useNavigate();
  const { setSuccess, setError } = useSnackbar();
  const header = requestHeader();

  // modal related states
  const [open, setOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ productName: "" });

  const resetModal = () => {
    setSelectedProduct({ productName: "" });
    setOpen((prev) => !prev);
  };

  const handleSetOpenChange = (e, product) => {
    // e.stopPropagation();
    setSelectedProduct(product);
    setOpen((prev) => !prev);
  };

  const handleProceed = async () => {
    try {
      const finalCart = cart;

      for (let i = 0; i < finalCart.length; i++) {
        delete finalCart[i].productPrice;
      }

      console.log(finalCart);
      await axios.post(
        "http://localhost:5290/api/customerorders/create",
        {
          products: finalCart,
          orderStatus: "Processing",
        },
        { headers: header }
      );

      setOrderOpen(false);
      setSuccess((prev) => [...prev, "Your order is now processing"]);
      resetCart();
      navigate("/");
    } catch (error) {
      setError((prev) => [...prev, "Something went wrong with your order"]);
      navigate("/");
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.productPrice * item.orderedQuantity,
    0
  );

  return (
    <NavbarLayout>
      <div className="m-auto h-screen p-5 justify-left flex flex-col">
        <div className="text-left">
          <h1 className="text-[30px] font-semibold mb-4">Cart</h1>
          <hr className="my-4" />
        </div>
        <div id="detail" className="flex-grow">
          {cart.map((item, index) => {
            return (
              <CartRow
                item={item}
                key={index}
                triggerModal={handleSetOpenChange}
              />
            );
          })}
          {/* Product total + Checkout Button */}
          <div className="text-right p-5">
            <h1 className="text-[28px] font-semibold mb-4">
              Total: HK${totalPrice}
            </h1>
            <button
              type="submit"
              className="bg-primary h-[40px] inline-block text-white rounded-full mt-4 px-6"
              onClick={() => {
                setOrderOpen(true);
              }}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>

      {/* Delete Product Modal */}
      <Modal
        open={open}
        onClose={resetModal}
        className="flex justify-center items-center"
      >
        {/* the empty react shard is used to prevent mui from producing warning */}
        <>
          <div className="p-8 rounded-lg w-[60%] h-[30%] bg-[#333333] text-white flex flex-col items-center justify-center gap-y-4">
            <p>Are you sure you want to delete</p>
            <span className="font-medium">{selectedProduct.productName}</span>
            {/* button group */}
            <div className="w-[300px] flex justify-between">
              <button className="bg-primary p-2 rounded" onClick={resetModal}>
                Cancel
              </button>
              <button
                className="bg-green-500 p-2 rounded"
                onClick={() => {
                  removeFromCart(selectedProduct);
                  resetModal();
                  window.location.reload();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </>
      </Modal>

      {/* Proceed to order Modal */}
      <Modal
        open={orderOpen}
        onClose={() => {
          setOrderOpen(false);
        }}
        className="flex justify-center items-center"
      >
        {/* the empty react shard is used to prevent mui from producing warning */}
        <>
          <div className="p-8 rounded-lg w-[60%] h-[30%] bg-[#333333] text-white flex flex-col items-center justify-center gap-y-4">
            <p>Proceed to checkout?</p>
            {/* button group */}
            <div className="w-[300px] flex justify-between">
              <button
                className="bg-primary p-2 rounded"
                onClick={() => {
                  setOrderOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 p-2 rounded"
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>
          </div>
        </>
      </Modal>
    </NavbarLayout>
  );
};

export default UserCartPage;
