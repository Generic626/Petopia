import React from "react";
import brandLogo from "../assets/petopia-brand.png";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-[60px] bg-primary flex items-center justify-between p-4 fixed inset-0 z-10">
      {/* Left side nav items */}
      <div className="flex justify-between w-[200px] text-white">
        <img
          src={brandLogo}
          alt="petopia brand logo"
          className="h-[60px] w-[60px] mr-2"
        />
        <NavLink to="/product/dog" className="font-semibold flex items-center">
          Dog
        </NavLink>
        <NavLink to="/product/cat" className="font-semibold flex items-center">
          Cat
        </NavLink>
      </div>

      {/* Right side nav items */}
      <div className="flex items-center text-white">
        <FaUserCircle className="h-[30px] w-[30px] mr-2" />
        <NavLink to="/login">
          <span>Sign-In</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
