import React from "react";
import emptyImg from "../assets/empty.png";

const EmptyData = ({ message }) => {
  return (
    <div className=" m-auto w-[400px] p-5 justify-center flex flex-col">
      <img src={emptyImg} alt="success" className="rounded-lg" />
      <h1 className="text-[20px] font-medium mb-4 text-center p-5 ">
        {message}
      </h1>
    </div>
  );
};

export default EmptyData;
