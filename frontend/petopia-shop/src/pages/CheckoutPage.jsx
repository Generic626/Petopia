import React from "react";
import NavbarLayout from "../layout/NavbarLayout";
import CheckoutProduct from "../components/CheckoutProduct";
import Product1 from "../assets/product_1.webp";
import Product2 from "../assets/product_2.webp";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/checkout-success';
        navigate(path);
    }
  return (
    <NavbarLayout>
      <div className=" m-auto w-[400px] p-5 justify-center flex flex-col">
        <div className="text-left ">
          <h1 className="text-[30px] font-semibold mb-4 ">Checkout</h1>
          <hr className="text-neutral-400 bg-neutral-400 h-0.5" />
        </div>
        <br />
        <div id="detail" style={{ backgroundImage: "" }}>
          <div className="ring-2 rounded-lg ring-neutral-400">
            <CheckoutProduct
              src={Product1}
              alt="Food 1"
              name="Food 1"
              qty="1"
              price="169"
            />
            <CheckoutProduct
              src={Product2}
              alt="Food 2"
              name="Food 2"
              qty="1"
              price="209"
            />
            <h1 className="text-[28px] font-semibold mb-4 text-right p-5">
              Total: HK$378
            </h1>
          </div>
          <form
            action=""
            className="flex flex-col justify-center p-2 text-left"
          >
            <label for="address">Address</label>
            <br />
            <input
              type="text"
              id="address"
              name="address"
              className="ring-2 ring-neutral-400 rounded-full h-[40px]"
            ></input>
            <br />
            <button
              type="submit"
              className="bg-primary h-[40px] w-full text-white rounded-full mt-4"
              onClick={routeChange}
            >
              Make Order
            </button>
          </form>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default CheckoutPage;

//             <div className="px-10 flex justify-center items-center h-auto w-80">
