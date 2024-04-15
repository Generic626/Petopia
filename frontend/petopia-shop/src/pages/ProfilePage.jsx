import React, { useState, useEffect } from "react";
import NavbarLayout from "../layout/NavbarLayout";
import { getUser } from "../functions/user-management.js";
import axios from "axios";
import useSnackbar from "../hook/useSnackbar.js";
import { TextField, Typography } from "@mui/material";
import { requestHeader } from "../functions/authentication-header.js";
import { updateUser, signOutUser } from "../functions/user-management.js";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { setSuccess, setError } = useSnackbar();
  const user = getUser();
  const header = requestHeader();

  const [email, setEmail] = useState(user.email);
  const [contact, setContact] = useState(user.contact);
  const [address, setAddress] = useState(user.address);

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [passwordError, setPasswordError] = useState({});

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    const formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // check if email is empty
    if (!email) {
      formErrors.email = "Email is required";
    }

    // check if given email is in valid format
    if (!emailRegex.test(email)) {
      formErrors.email = "Invalid Email format";
    }

    // check if password is empty
    if (!contact) {
      formErrors.contact = "Contact is required";
    }

    // check if password is empty
    if (!address) {
      formErrors.address = "Address is required";
    }

    // Set errors or submit the form
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // submit the information to api to create an account
      try {
        // submit to api to create account
        const updatePayload = {
          newEmail: email,
          newContact: contact,
          newAddress: address,
        };

        await axios.post(
          "http://localhost:5290/api/customers/modify",
          updatePayload,
          { headers: header }
        );

        setSuccess((prev) => [...prev, "Update Information Successful"]);
        updateUser(email, contact, address);
        // signOutUser();
      } catch (error) {
        formErrors.update = "Update User Failed. Please try again.";
        setErrors(formErrors);
      }
    }
  };
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const formErrors = {};
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*._-])[a-zA-Z0-9!@#$%^&*._-]+$/;

    // check if password is empty
    if (!passwords.password) {
      formErrors.password = "Password is required";
    }

    // check if password meets pattern
    if (!passwordRegex.test(passwords.password)) {
      formErrors.password =
        "Must contain at least one letter, one number, and one special character";
    }

    // check if both passwords are identical
    if (passwords.password != passwords.confirmPassword) {
      formErrors.confirmPassword = "Both passwords are not identical";
    }

    // Set errors or submit the form
    if (Object.keys(formErrors).length > 0) {
      setPasswordError(formErrors);
    } else {
      // submit the information to api to create an account
      try {
        // submit to api to create account
        const updatePayload = {
          newPassword: passwords.password,
        };

        await axios.post(
          "http://localhost:5290/api/customers/modify",
          updatePayload,
          { headers: header }
        );

        setSuccess((prev) => [...prev, "Reset Password Successful"]);

        sessionStorage.clear();
        // redirect user to login
        navigate(`/login`);
      } catch (error) {
        formErrors.reset = "Reset Password Failed. Please try again.";
        setPasswordError(formErrors);
      }
    }
  };

  return (
    <NavbarLayout>
      <div className="mt-20 h-screen">
        <h1
          className="text-2xl ml-4 
         pb-4 font-semibold"
        >
          Your Profile
        </h1>
        <div className="flex justify-between ">
          {/* Left hand form */}
          <div className="text-left border border-black rounded-lg p-8 w-1/2 m-4 mb-12">
            <form>
              <div className="mb-4">
                {/* <label htmlFor="email">Email</label>
                <br /> */}
                {/* <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="border border-black rounded px-2 w-full mb-2"
                  defaultValue="doglover@gmail.com"
                /> */}
                {/* Email input */}
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email != undefined}
                  helperText={errors.email}
                />
              </div>
              {/* <div className="mb-4">
                <label htmlFor="contact">Contact</label>
                <br />
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  required
                  className="border border-black rounded px-2 w-full mb-2"
                  defaultValue="12345678"
                />
              </div> */}
              {/* Contact */}
              <TextField
                margin="dense"
                required
                fullWidth
                id="contact"
                label="Contact"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                error={errors.contact != undefined}
                helperText={errors.contact}
              />
              {/* <div className="mb-4">
                <label htmlFor="address">Address</label>
                <br />
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="border border-black rounded px-2 w-full mb-2"
                  defaultValue="PolyU Student Halls of Residence, 1 Hung Lai Rd, Hung Hom"
                />
              </div> */}
              {/* Address */}
              <TextField
                margin="dense"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={errors.address != undefined}
                helperText={errors.address}
              />
              <div>
                <button
                  type="submit"
                  className="bg-primary h-10 w-full text-white rounded-full mt-4"
                  onClick={handleUpdateCustomer}
                >
                  Submit
                </button>

                {errors.update && (
                  <Typography className=" text-red-500 text-xs" sx={{ mb: 1 }}>
                    {errors.update}
                  </Typography>
                )}
              </div>
            </form>
          </div>

          {/* Right hand form */}
          <div className="text-left border border-black rounded-lg p-8 w-1/2 m-4 mb-12">
            <form>
              {/* <div className="mb-4">
                <label htmlFor="old-password">Old Password</label>
                <br />
                <input
                  type="password"
                  id="old-password"
                  name="old-password"
                  required
                  className="border border-black rounded px-2 w-full mb-2"
                />
              </div> */}
              {/* <div className="mb-4">
                <label htmlFor="new-password">New Password</label>
                <br />
                <input
                  type="password"
                  id="new-password"
                  name="new-password"
                  required
                  className="border border-black rounded px-2 w-full mb-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirm-password">Confirm Password</label>
                <br />
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  required
                  className="border border-black rounded px-2 w-full mb-2"
                />
              </div> */}
              {/* Password input */}
              <TextField
                margin="dense"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={passwords.password}
                onChange={(e) =>
                  setPasswords((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
                error={passwordError.password != undefined}
                helperText={passwordError.password}
              />
              {/* Confirm Password input */}
              <TextField
                margin="dense"
                required
                fullWidth
                name="password"
                label="Enter password again"
                type="password"
                id="confirmPassword"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords((prev) => {
                    return { ...prev, confirmPassword: e.target.value };
                  })
                }
                error={passwordError.confirmPassword != undefined}
                helperText={passwordError.confirmPassword}
              />
              <div>
                <button
                  type="submit"
                  className="bg-primary h-10 w-full text-white rounded-full mt-4"
                  onClick={handleUpdatePassword}
                >
                  Update Password
                </button>
                {errors.reset && (
                  <Typography className=" text-red-500 text-xs" sx={{ mb: 1 }}>
                    {errors.reset}
                  </Typography>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default ProfilePage;
