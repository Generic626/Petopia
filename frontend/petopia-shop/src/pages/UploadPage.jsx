import React, { useState } from "react";
import CheckoutSuccess from "../components/CheckoutSuccess";
import NavbarLayout from "../layout/NavbarLayout";
import { TextField, Button } from "@mui/material";
import { MuiFileInput } from 'mui-file-input'
import { NavLink } from "react-router-dom";
import axios from "axios";

const UploadPage = () => {
    React.useEffect(() => {
        document.title = "Upload Product";
        return () => {
            document.title = "Petopia";
        };
    }, []);

    const [isSuccess, setIsSuccess] = useState(false);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productKeywords, setProductKeywords] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productCategory, setProductCategory] = useState('');
    const [errors, setErrors] = useState({});

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
    }, [productName])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formValidation()) {
            return;
        }
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productPrice', productPrice);
        formData.append('productQuantity', productQuantity);
        formData.append('productKeywords', productKeywords);
        formData.append('productImage', productImage);
        formData.append('categoryId', productCategory);
        axios
            .post('http://localhost:5290/api/Products/Create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log(response);
                setIsSuccess(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <NavbarLayout>
            <div className=" m-auto h-screen w-[500px] p-5 justify-center flex flex-col">
                <div className="text-left ">
                    <h1 className="text-[30px] font-semibold mb-4 ">Upload Product</h1>
                    <hr className="text-neutral-400 bg-neutral-400 h-0.5" />
                </div>
                <br />
                {/* Show Success */}
                {isSuccess && <CheckoutSuccess message={"Upload Completed"}/>}
                {!isSuccess && (
                    <div id="detail">
                        <form
                            onSubmit={handleSubmit}
                            action=""
                            className="flex flex-col justify-center items-center w-[100%] p-2"
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
                            <TextField
                                margin="dense"
                                fullWidth
                                id="productCategory"
                                label="Product Category"
                                name="productCategory"
                                type="number"
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                            />

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
                            />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="bg-primary h-[40px] w-full text-white rounded-full mt-4"
                            >
                                Upload
                            </button>
                            <NavLink
                                to="/"
                                className="hover:bg-primary border ease-linear duration-200 border-primary h-[40px] w-full text-primary hover:text-white rounded-full mt-4 flex items-center justify-center"
                            >
                                Head Back to Home
                            </NavLink>
                        </form>
                    </div>
                )}
            </div>
        </NavbarLayout>
    );
};

export default UploadPage;