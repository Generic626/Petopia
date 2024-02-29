import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NavbarLayout = (props) => {
  return (
    <div className="w-screen mt-[60px]">
      {/* Top Nav bar */}
      <Navbar />
      {/* Main Content */}
      <main className="w-full h-full">{props.children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NavbarLayout;
