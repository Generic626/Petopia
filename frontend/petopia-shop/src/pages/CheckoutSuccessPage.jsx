import React from "react";
import NavbarLayout from "../layout/NavbarLayout";
import success_pic from "../assets/success.png";

const CheckoutSuccessPage = () => {
  return (
    <NavbarLayout>
      <div className=" m-auto w-[400px] p-5 justify-center flex flex-col">
        <div className="text-left ">
          <h1 className="text-[30px] font-semibold mb-4 ">Checkout</h1>
          <hr className="text-neutral-400 bg-neutral-400 h-0.5" />
        </div>
        <br />
        <img
        src={success_pic}
        alt="success"
        className="h-[280px] w-[350px]"
      />
      <h1 className="text-[30px] font-semibold mb-4 text-center p-5">Purchase Completed</h1>
      </div>
      
    </NavbarLayout>
  );
};

export default CheckoutSuccessPage;
