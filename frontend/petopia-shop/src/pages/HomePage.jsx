import React from "react";
import banner from "../assets/petopia-banner.png";
import NavbarLayout from "../layout/NavbarLayout";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Petopia"; // Set the desired page title
    return () => {
      document.title = "Petopia"; // Reset the title when the component unmounts
    };
  }, []);

  return (
    <NavbarLayout>
      {/* Brand Banner */}
      <div className="mt-[100px] relative">
        {/* Brand Banner Image */}
        <img src={banner} alt="petopia banner" className="object-cover" />
        {/* Brand Filter */}
        <div className="bg-primary h-full w-full absolute inset-0 opacity-70 text-white" />
        {/* Brand title */}
        <div className="absolute inset-0 text-white flex flex-col items-center justify-center">
          <h1 className="text-[60px] font-[600] mb-4">Welcome to Petopia</h1>
          <span className="text-xl">
            You're one stop shop for ALL your pet's needs
          </span>
        </div>
      </div>

      {/* Call to Action */}
      {/* Category Displacement */}
    </NavbarLayout>
  );
};

export default HomePage;
