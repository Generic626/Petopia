import brandLogo from "../assets/petopia-brand.png";
import MainThemeContainer from "../components/UI/MainThemeContainer";
import { TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import TipLink from "../components/TipLink";
import { setAdmin } from "../functions/user-management";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  // set title page name
  useEffect(() => {
    document.title = "Welcome Back"; // Set the desired page title
    return () => {
      document.title = "Petopia"; // Reset the title when the component unmounts
    };
  }, []);

  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = {};
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // check if email is empty
    // if (!email) {
    //   formErrors.email = "Email is required";
    // }

    // check if given email is in valid format
    // if (!emailRegex.test(email)) {
    //   formErrors.email = "Invalid Email format";
    // }

    // check if the username is empty
    if (!username) {
      formErrors.username = "Username is required";
    }

    // check if password is empty
    if (!password) {
      formErrors.password = "Password is required";
    }

    // Set errors or submit the form
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // submit the information to api to create an account
      try {
        // submit to api to login as admin
        const loginPayload = {
          username: username,
          password: password,
        };
        const response = await axios.post(
          "http://localhost:5290/api/admins/login",
          loginPayload
        );
        const user = response.data;
        setAdmin(user.id, user.username, user.email, user.token, "admin");

        // redirect user to main page
        navigate(`/`);
      } catch (error) {
        // console.log(error);

        formErrors.login = "Login Failed. Please try again.";
        setErrors(formErrors);
      }
    }
  };

  return (
    <MainThemeContainer className="flex justify-center items-center">
      <div className="h-[565px] w-[505px] rounded-[20px] bg-white flex flex-col justify-center items-center">
        {/* Login Form Title */}
        <div className="flex items-center">
          <img
            src={brandLogo}
            alt="petopia brand logo"
            className="h-[60px] w-[60px] mr-2"
          />
          <span className="font-[600px] text-3xl">Admin Login</span>
        </div>
        {/* Form */}
        <form
          action=""
          className="flex flex-col justify-center items-center w-[80%] p-2"
        >
          {/* Email input */}
          {/* <TextField
            margin="dense"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email != undefined}
            helperText={errors.email}
          /> */}

          {/* Username Input */}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password != undefined}
            helperText={errors.password}
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
          {/* Login Error */}
          <div className="w-full">
            {errors.login && (
              <Typography className=" text-red-500 text-xs" sx={{ mb: 1 }}>
                {errors.login}
              </Typography>
            )}
          </div>
          {/* Don't have account link */}
          <div className="w-full mt-2 flex flex-col">
            <TipLink path="/login" text="Customer Login" />
          </div>
        </form>
      </div>
    </MainThemeContainer>
  );
};

export default LoginPage;
