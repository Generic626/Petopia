import React from "react";
import NavbarLayout from "../layout/NavbarLayout";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Petopia"; // Set the desired page title
    return () => {
      document.title = "Petopia"; // Reset the title when the component unmounts
    };
  }, []);

  return <NavbarLayout>Hello</NavbarLayout>;
};

export default HomePage;
