import React, { useState, useEffect } from "react";
import success_pic from "../assets/success.png";

const CheckoutSuccessPage = (props) => {
  // Check props contain any data
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (props && props.message) {
      setMessage(props.message);
    } else {
      setMessage("Purchase Completed");
    }
  }, [props]);
  return (
    <div className=" m-auto w-[400px] p-5 justify-center flex flex-col">
      <img src={success_pic} alt="success" className="h-[280px] w-[350px]" />
      <h1 className="text-[30px] font-semibold mb-4 text-center p-5">
        {message}
      </h1>
    </div>
  );
};

export default CheckoutSuccessPage;
