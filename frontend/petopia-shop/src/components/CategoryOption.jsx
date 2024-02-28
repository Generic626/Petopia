import React from "react";

const CategoryOption = (props) => {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      <img
        src={props.src}
        alt={props.alt}
        className="h-[300px] w-[300px] rounded-lg mb-4"
      />
      <span className="text-xl">{props.title}</span>
    </div>
  );
};

export default CategoryOption;
