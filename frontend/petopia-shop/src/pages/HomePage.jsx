import React from "react";
import banner from "../assets/petopia-banner.png";
import dogLogo from "../assets/dog_logo.png";
import catLogo from "../assets/cat_logo.png";
import NavbarLayout from "../layout/NavbarLayout";
import CategoryOption from "../components/CategoryOption";
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
      <section className="mt-[100px] relative mb-[60px]">
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
      </section>
      {/* Call to Action */}
      <section className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-2xl font-[400]">
          Browse from our category of products
        </h1>
      </section>
      {/* Category Displacement */}
      <section className="flex w-full items-center justify-center gap-8">
        {/* Dog Option */}
        <CategoryOption src={dogLogo} alt="Dog option" title="Dog Products" />

        {/* Cat Option */}
        <CategoryOption src={catLogo} alt="Cat option" title="Cat Products" />
      </section>
    </NavbarLayout>
  );
};

export default HomePage;
