import React from "react";
import brandLogo from "../assets/petopia-brand.png";

const Footer = () => {
  return (
    <div className="w-screen h-[200px] bg-secondary text-white p-4 flex flex-col justify-center items-center">
      {/* Brand title */}
      <div className="flex items-center">
        <img
          src={brandLogo}
          alt="petopia brand logo"
          className="h-[60px] w-[60px] mr-2"
        />
        <span className="font-[600]">Petopia - Pet shop</span>
      </div>
      {/* Disclaimer */}
      <span className="text-xs">©2024 All rights reserved.</span>
    </div>
  );
};

export default Footer;
