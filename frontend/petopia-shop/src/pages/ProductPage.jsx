import React, { useEffect, useState, useContext } from "react";
import NavbarLayout from "../layout/NavbarLayout";
import Product from "../components/Product";
import { useParams } from "react-router";
import { IoIosSearch } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { requestHeader } from "../functions/authentication-header";
import axios from "axios";
import { Modal } from "@mui/material";
import { SuccessContext } from "../context/success-context";
import { ErrorContext } from "../context/error-context";
import useSnackbar from "../hook/useSnackbar";
import EmptyData from "../components/EmptyData";

const ProductPage = () => {
  // product page states
  const { category } = useParams();
  const [keyword, setKeyword] = useState("");
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortByName, setSortByName] = useState(false);
  const [sortByPrice, setSortByPrice] = useState(false);

  // modal related states
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ productName: "" });

  // use context states
  // const { success, setSuccess } = useContext(SuccessContext);
  // const { error, setError } = useContext(ErrorContext);

  const { setSuccess, setError } = useSnackbar();

  const header = requestHeader({ "Content-Type": "application/json" });

  // get initial product list and filter thme
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          "http://localhost:5290/api/products/all"
        );

        console.log(response.data);

        const productsByCategory = response.data.filter(
          (product) =>
            product.category.categoryName ==
            category.charAt(0).toUpperCase() + category.slice(1)
        );

        setOriginalProducts(productsByCategory);
        setProducts(productsByCategory);
      };

      fetchData();
    } catch (error) {
      setProducts([]);
    }
  }, [category]);

  // filter product list  by key words
  useEffect(() => {
    const filteredArray = originalProducts.filter((product) =>
      product.productName.toLowerCase().includes(keyword.toLowerCase())
    );
    setProducts(filteredArray);
  }, [keyword]);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSetOpenChange = (e, product) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setOpen((prev) => !prev);
  };

  const resetModal = () => {
    setSelectedProduct({ productName: "" });
    setOpen((prev) => !prev);
  };

  const sendDeleteRequest = async () => {
    try {
      await axios.post(
        `http://localhost:5290/api/products/remove/${selectedProduct.productId}`,
        {},
        { headers: header }
      );

      setProducts((prev) =>
        prev.filter((item) => item.productId != selectedProduct.productId)
      );

      setOriginalProducts((prev) =>
        prev.filter((item) => item.productId != selectedProduct.productId)
      );

      setSuccess((prev) => [...prev, "Delete product successful"]);
    } catch (error) {
      setError((prev) => [...prev, "Error in deleting product"]);
    }

    resetModal();
  };

  const handleSortByNameChange = () => {
    // check sorting method
    // default false = ascending order
    // true = decending order

    let sortedArray = [];

    if (!sortByName) {
      sortedArray = products.sort((a, b) =>
        b.productName.localeCompare(a.productName)
      );
    } else {
      sortedArray = products.sort((a, b) =>
        a.productName.localeCompare(b.productName)
      );
    }

    setProducts(sortedArray);

    // reverse the sorting
    setSortByName((prev) => {
      return !prev;
    });
  };

  const handleSortByPriceChange = () => {
    // check sorting method
    // default false = ascending order
    // true = decending order

    let sortedArray = [];

    if (!sortByPrice) {
      sortedArray = products.sort(
        (a, b) => Number(a.productPrice) - Number(b.productPrice)
      );
    } else {
      sortedArray = products.sort(
        (a, b) => Number(b.productPrice) - Number(a.productPrice)
      );
    }

    setProducts(sortedArray);

    // reverse the sorting
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
      <div className="w-full h-screen p-8 ">
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

        {/* Product List */}
        <div className="flex flex-wrap justify-center items-center gap-y-8">
          {products.map((product, key) => {
            return (
              <Product
                product={product}
                key={key}
                triggerModal={handleSetOpenChange}
              />
            );
          })}
          {products.length == 0 && (
            <EmptyData message={"Come back again later"} />
          )}
        </div>
      </div>

      {/* Delete Product Modal */}
      <Modal
        open={open}
        onClose={resetModal}
        className="flex justify-center items-center"
      >
        {/* the empty react shard is used to prevent mui from producing warning */}
        <>
          <div className="p-8 rounded-lg w-[60%] h-[30%] bg-[#333333] text-white flex flex-col items-center justify-center gap-y-4">
            <p>Are you sure you want to delete</p>
            <span className="font-medium">{selectedProduct.productName}</span>
            {/* button group */}
            <div className="w-[300px] flex justify-between">
              <button className="bg-primary p-2 rounded" onClick={resetModal}>
                Cancel
              </button>
              <button
                className="bg-green-500 p-2 rounded"
                onClick={sendDeleteRequest}
              >
                Confirm
              </button>
            </div>
          </div>
        </>
      </Modal>
    </NavbarLayout>
  );
};

export default ProductPage;
