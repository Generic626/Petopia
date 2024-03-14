import React from "react";
import { AiFillDelete } from "react-icons/ai";

const TrashButton = ({ triggerModal }) => {
  return (
    <div
      className="cursor-pointer hover:bg-primary rounded-full p-2 group duration-100 ease-linear"
      onClick={triggerModal}
    >
      <AiFillDelete className="text-primary group-hover:text-white h-[25px] w-[25px]" />
    </div>
  );
};

export default TrashButton;
