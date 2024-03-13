import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteProductButton = (props) => {
  const triggerModal = props.triggerModal;
  const product = props.product;
  return (
    <button
      className="absolute top-2 right-2"
      onClick={(e) => {
        triggerModal(e, product);
      }}
    >
      <FaRegTrashAlt className="text-transparent group-hover:text-primary m-4" />
    </button>
  );
};

export default DeleteProductButton;
