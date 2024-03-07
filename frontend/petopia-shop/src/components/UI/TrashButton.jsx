import React from "react";
import { AiFillDelete } from "react-icons/ai";

const TrashButton = () => {
  return (
    <div className="cursor-pointer hover:bg-primary rounded-full p-2 group duration-100 ease-linear">
      <AiFillDelete className="text-primary group-hover:text-white" />
    </div>
  );
};

export default TrashButton;
