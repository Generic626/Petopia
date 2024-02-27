import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NavbarLayout = (props) => {
  return (
    // Full screen container
    <div className="w-screen h-screen">
      {/* Top Nav bar */}
      <Navbar />
      {/* Main Content */}
      <main>{props.children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NavbarLayout;
