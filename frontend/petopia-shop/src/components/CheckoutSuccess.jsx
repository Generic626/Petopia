import React from "react";
import success_pic from "../assets/success.png";

const CheckoutSuccessPage = () => {
  return (
    <div className=" m-auto w-[400px] p-5 justify-center flex flex-col">
      <img src={success_pic} alt="success" className="h-[280px] w-[350px]" />
      <h1 className="text-[30px] font-semibold mb-4 text-center p-5">
        Purchase Completed
      </h1>
    </div>
  );
};

export default CheckoutSuccessPage;
