import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SnackbarGroup from "../components/UI/SnackbarGroup";

const NavbarLayout = (props) => {
  return (
    <div className="w-screen mt-[60px]">
      {/* Top Nav bar */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full h-full">{props.children}</main>

      {/* Footer */}
      <Footer />

      {/* Snackbar Group */}
      <SnackbarGroup />
    </div>
  );
};

export default NavbarLayout;
