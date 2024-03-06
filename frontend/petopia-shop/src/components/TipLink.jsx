import React from "react";
import { NavLink } from "react-router-dom";

const TipLink = (props) => {
  return (
    <NavLink to={`${props.path}`} className="w-auto">
      <span className="text-sm underline text-slate-400 italic">
        {props.text}
      </span>
    </NavLink>
  );
};

export default TipLink;
