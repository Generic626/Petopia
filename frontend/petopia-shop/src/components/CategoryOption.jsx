import React from "react";
import { NavLink } from "react-router-dom";

const CategoryOption = (props) => {
  return (
    <NavLink to={`/product/${props.path}`}>
      <div className="flex flex-col items-center cursor-pointer">
        <img
          src={props.src}
          alt={props.alt}
          className="h-[300px] w-[300px] rounded-lg mb-4"
        />
        <span className="text-xl">{props.title}</span>
      </div>
    </NavLink>
  );
};

export default CategoryOption;
