import React, { useEffect, useState } from "react";
import NavbarLayout from "../layout/NavbarLayout";
import Product from "../components/Product";
import { useParams } from "react-router";
import producList from "../data/product";
import { IoIosSearch } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

const ProductPage = () => {
  const { category } = useParams();
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [sortByName, setSortByName] = useState(false);
  const [sortByPrice, setSortByPrice] = useState(false);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSortByNameChange = () => {
    setSortByName((prev) => {
      return !prev;
    });
  };

  const handleSortByPriceChange = () => {
    setSortByPrice((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    document.title = `${category == "cat" ? "Cat" : "Dog"} Product`; // Set the desired page title
    return () => {
      document.title = "Petopia"; // Reset the title when the component unmounts
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls the page back to top
  }, []);

  // Soon to be added retrieval login from db

  return (
    <NavbarLayout>
      <div className="w-full h-full p-8 ">
        {/* Product Page Title */}
        <h1 className="text-2xl font-normal">
          {`${category == "cat" ? "Cat" : "Dog"}`} - Products
        </h1>
        {/* Search + Sort Row */}
        <div className="flex items-center">
          {/* Search Bar */}
          <div className="flex items-center rounded-lg shadow-md bg-white border text-[#857676] px-2 mr-2 w-[300px] my-4">
            <IoIosSearch className="inline w-[25px] h-[25px] mr-2" />
            <input
              type="text"
              placeholder="Search for a product"
              className="w-full p-2 outline-0 rounded-full"
              value={keyword}
              onChange={handleKeywordChange}
            />
          </div>
          {/* Sort Row */}
          <div className="flex ">
            {/* Sort By Name */}
            <button
              className="mx-2 border p-2 rounded-lg shadow-md flex items-center"
              onClick={handleSortByNameChange}
            >
              Sort By Name{" "}
              {sortByName == true ? (
                <FaArrowUp className="ml-2" />
              ) : (
                <FaArrowDown className="ml-2" />
              )}
            </button>
            {/* Sort By Price */}
            <button
              className="mx-2 border p-2 rounded-lg shadow-md flex items-center"
              onClick={handleSortByPriceChange}
            >
              Sort By Price{" "}
              {sortByPrice == true ? (
                <FaArrowUp className="ml-2" />
              ) : (
                <FaArrowDown className="ml-2" />
              )}
            </button>
          </div>
        </div>
        {/*  */}
        <div></div>
        {/* Product List */}
        <div className="flex flex-wrap justify-center items-center gap-y-8">
          {producList.map((product, key) => {
            return <Product product={product} key={key} />;
          })}
          {producList.map((product, key) => {
            return <Product product={product} key={key} />;
          })}
          {producList.map((product, key) => {
            return <Product product={product} key={key} />;
          })}
          {producList.map((product, key) => {
            return <Product product={product} key={key} />;
          })}
        </div>
      </div>
    </NavbarLayout>
  );
};

export default ProductPage;
