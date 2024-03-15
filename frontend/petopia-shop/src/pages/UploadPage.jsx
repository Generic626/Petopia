import React, { useState } from "react";
import CheckoutSuccess from "../components/CheckoutSuccess";
import NavbarLayout from "../layout/NavbarLayout";
import {
  TextField,
  Alert,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { requestHeader } from "../functions/authentication-header";
import useSnackbar from "../hook/useSnackbar";

const UploadPage = () => {
  useEffect(() => {
    document.title = "Upload Product";
    return () => {
      document.title = "Petopia";
    };
  }, []);
  const header = requestHeader({ "Content-Type": "application/json" });
  const { setSuccess } = useSnackbar();

  const [isSuccess, setIsSuccess] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productKeywords, setProductKeywords] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [postError, setPostError] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // get all existing categories
  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5290/api/categories/all",
            {
              headers: header,
            }
          );
          setCategoryList(response.data);
        } catch (error) {
          // Handle any errors
          console.error(error);
        }
      };

      fetchData();
    } catch (error) {
      console.log(error);
      setCategoryList([]);
    }
  }, []);

  const formValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!productName) {
      formIsValid = false;
      errors["productName"] = "Product Name is required";
    }

    setErrors(errors);
    return formIsValid;
  };

  // Clear error message when user start typing
  React.useEffect(() => {
    if (productName) {
      let errors = {};
      errors["productName"] = "";
      setErrors(errors);
    }
  }, [productName]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formValidation()) {
      return;
    }
    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    formData.append("productQuantity", productQuantity);
    formData.append("productKeywords", productKeywords);
    formData.append("productImage", productImage);
    formData.append("categoryId", productCategory);

    axios
      .post("http://localhost:5290/api/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Hardcoded admin token for testing, valid until 2025, should be replaced after testing
          Authorization:
            "Bearer " +
            (sessionStorage.getItem("token") ||
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluXzEyMyIsIm5hbWVpZCI6ImI2YmFkZTgyLTdiZDctNDZiYS1iZTc4LTFlZThhOTMyM2VkMyIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTcwOTgyNDE5NCwiZXhwIjoxNzQxMzYwMTk0LCJpYXQiOjE3MDk4MjQxOTQsImlzcyI6InBldG9waWEiLCJhdWQiOiJwZXRvcGlhIn0.Kob1n-Ecep-Y7xUPiv9bVZGhd2I5sB1_qx9UJq9ppa8"),
        },
      })
      .then((response) => {
        setSuccess((prev) => [...prev, "Create Item Successful"]);

        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setProductQuantity("");
        setProductKeywords("");
        setProductImage(null);
        setProductCategory("");
        setErrors({});
        setPostError([]);

        // setIsSuccess(true);
      })
      .catch((error) => {
        console.log(error);

        let newPostError = [...postError]; // create a copy of the current state
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // server custom error message
          newPostError.push(error.response.data.message);
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          // server default error message
          if (
            error.response.data.errors.constructor === Object &&
            Object.keys(error.response.data.errors).length > 0
          ) {
            newPostError = [
              ...newPostError,
              ...Object.values(error.response.data.errors).map(
                (error) => error[0]
              ),
            ];
          } else {
            newPostError.push("An error occurred while uploading the product");
          }
        } else if (error.message) {
          // axios error message
          newPostError.push(error.message);
        } else {
          newPostError.push("An error occurred while uploading the product");
        }
        setPostError(newPostError); // update the state with the new array
      });
  };

  return (
    <NavbarLayout>
      {postError &&
        postError.map((error, index) => (
          <Alert
            key={index}
            severity="error"
            onClose={() =>
              setPostError(postError.filter((_, i) => i !== index))
            }
          >
            {error}
          </Alert>
        ))}
      <div className=" m-auto h-screen w-[500px] p-5 justify-center flex flex-col">
        <div className="text-left ">
          <h1 className="text-[30px] font-semibold mb-4 ">Upload Product</h1>
          <hr className="text-neutral-400 bg-neutral-400 h-0.5" />
        </div>
        <br />
        {/* Show Success */}
        <div id="detail">
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col justify-center items-center w-[100%] p-2 gap-y-2"
          >
            {/* productName */}
            <TextField
              margin="dense"
              fullWidth
              id="productName"
              label="Product Name"
              name="productName"
              autoFocus
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              error={errors["productName"] ? true : false}
              helperText={errors["productName"]}
              required
            />

            {/* productDescription */}
            <TextField
              margin="dense"
              fullWidth
              id="productDescription"
              label="Product Description"
              name="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />

            {/* productPrice */}
            <TextField
              margin="dense"
              fullWidth
              id="productPrice"
              label="Product Price"
              name="productPrice"
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />

            {/* productQuantity */}
            <TextField
              margin="dense"
              fullWidth
              id="productQuantity"
              label="Product Quantity"
              name="productQuantity"
              type="number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              required
            />

            {/* productKeywords */}
            <TextField
              margin="dense"
              fullWidth
              id="productKeywords"
              label="Product Keywords"
              name="productKeywords"
              value={productKeywords}
              onChange={(e) => setProductKeywords(e.target.value)}
            />

            {/* productCategory */}
            <FormControl fullWidth margin="dense">
              <InputLabel id="productCategoryLabel">Category *</InputLabel>
              <Select
                fullWidth
                required
                labelId="productCategoryLabel"
                id="productCategory"
                value={productCategory}
                label="Category"
                onChange={(e) => setProductCategory(e.target.value)}
              >
                {categoryList.map((category) => {
                  return (
                    <MenuItem value={category.categoryId}>
                      {category.categoryName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* productImage */}
            <MuiFileInput
              margin="dense"
              fullWidth
              id="productImage"
              label="Product Image"
              name="productImage"
              type="file"
              placeholder="Click here to upload image"
              value={productImage}
              onChange={(e) => setProductImage(e)}
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-primary h-[40px] w-full text-white rounded-full mt-4"
            >
              Upload
            </button>
          </form>
        </div>
        {/* )} */}
      </div>
    </NavbarLayout>
  );
};

export default UploadPage;
