import brandLogo from "../assets/petopia-brand.png";
import MainThemeContainer from "../components/UI/MainThemeContainer";
import { TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SuccessContext } from "../context/success-context";
import useSnackbar from "../hook/useSnackbar";

const SignUpPage = () => {
  // set title page name
  useEffect(() => {
    document.title = "Sign-up"; // Set the desired page title
    return () => {
      document.title = "Petopia"; // Reset the title when the component unmounts
    };
  }, []);

  // used to navigate between pages
  const navigate = useNavigate();

  // set success state
  // const { setSuccess } = useContext(SuccessContext);
  const { setSuccess } = useSnackbar();

  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState({});

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*._-])[a-zA-Z0-9!@#$%^&*._-]+$/;

    // check if email is empty
    if (!email) {
      formErrors.email = "Email is required";
    }

    // check if given email is in valid format
    if (!emailRegex.test(email)) {
      formErrors.email = "Invalid Email format";
    }

    // check if the username is empty
    if (!username) {
      formErrors.username = "Username is required";
    }

    // check if password is empty
    if (!contact) {
      formErrors.contact = "Contact is required";
    }

    // check if password is empty
    if (!address) {
      formErrors.address = "Address is required";
    }

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
      setErrors(formErrors);
    } else {
      // submit the information to api to create an account
      try {
        // submit to api to create account
        const registerPayload = {
          customerUsername: username,
          customerPassword: passwords.password,
          customerEmail: email,
          customerContact: contact,
          customerAddress: address,
        };

        await axios.post(
          "http://localhost:5290/api/customers/register",
          registerPayload
        );

        setSuccess((prev) => [...prev, "Create Account Successful"]);

        // redirect user to login
        navigate(`/login`);
      } catch (error) {
        const msg = error.response.data.message;

        if (msg == "Username already exists") {
          formErrors.register = "Username already been registered.";
        } else {
          formErrors.register = "Register User Failed. Please try again.";
        }
        setErrors(formErrors);
      }
    }
  };

  return (
    <MainThemeContainer className="flex justify-center items-center">
      <div className="py-10 w-[505px] rounded-[20px] bg-white flex flex-col justify-center items-center">
        {/* Login Form Title */}
        <div className="flex items-center">
          <img
            src={brandLogo}
            alt="petopia brand logo"
            className="h-[60px] w-[60px] mr-2"
          />
          <span className="font-[600px] text-3xl">Hello stranger</span>
        </div>
        {/* Subtitle */}
        <span className="text-slate-400">Tell us who you are</span>
        {/* Form */}
        <form
          action=""
          className="flex flex-col justify-center items-center w-[80%] p-2"
        >
          {/* Username */}
          <TextField
            margin="dense"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username != undefined}
            helperText={errors.username}
          />

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
            error={errors.password != undefined}
            helperText={errors.password}
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
            error={errors.confirmPassword != undefined}
            helperText={errors.confirmPassword}
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary h-[40px] w-full text-white rounded-full mt-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <NavLink
            to="/"
            className="hover:bg-primary border ease-linear duration-200 border-primary h-[40px] w-full text-primary hover:text-white rounded-full mt-4 flex items-center justify-center"
          >
            Head Back to Home
          </NavLink>
          {/* Register Error */}
          <div className="w-full">
            {errors.register && (
              <Typography className=" text-red-500 text-xs" sx={{ mb: 1 }}>
                {errors.register}
              </Typography>
            )}
          </div>
          {/* Already have an account link */}
          <div className="w-full mt-2">
            <NavLink to="/login">
              <span className="text-sm underline text-slate-400 italic">
                Already have an account?
              </span>
            </NavLink>
          </div>
        </form>
      </div>
    </MainThemeContainer>
  );
};

export default SignUpPage;
