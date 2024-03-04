import React, { useState } from "react";
import NavbarLayout from "../layout/NavbarLayout";
import CartProduct from "../components/CartProduct";
import Product1 from "../assets/product_1.webp";
import Product2 from "../assets/product_2.webp";

const UserCartPage = () => {
  return (
    <NavbarLayout>
      <div className="m-auto h-screen p-5 justify-left flex flex-col">
        <div className="text-left">
          <h1 className="text-[30px] font-semibold mb-4">Cart</h1>
          <hr className="my-4" />
        </div>
        <div id="detail" className="flex-grow">
          <div className="rounded-full overflow-hidden p-2 mb-4">
            <div className="ring-2 ring-neutral-400 rounded-full p-1 bg-white">
              <CartProduct
                src={Product1}
                alt="Food 1"
                name="Food 1"
                qty="1"
                price="169"
              />
            </div>
          </div>
          <div className="rounded-full overflow-hidden p-2 mb-4">
            <div className="ring-2 ring-neutral-400 rounded-full p-1 bg-white">
              <CartProduct
                src={Product2}
                alt="Food 2"
                name="Food 2"
                qty="1"
                price="209"
              />
            </div>
          </div>
          <div className="text-right p-5">
            <h1 className="text-[28px] font-semibold mb-4">Total: HK$378</h1>
            <button
              type="submit"
              className="bg-primary h-[40px] inline-block text-white rounded-full mt-4 px-6"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default UserCartPage;