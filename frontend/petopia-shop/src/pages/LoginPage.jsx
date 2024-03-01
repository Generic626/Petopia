import brandLogo from "../assets/petopia-brand.png";
import MainThemeContainer from "../components/UI/MainThemeContainer";
import { TextField, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginPage = () => {
  // set title page name
  useEffect(() => {
    document.title = "Welcome Back"; // Set the desired page title
    return () => {
      document.title = "Petopia"; // Reset the title when the component unmounts
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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
          <span className="font-[600px] text-3xl">Welcome Back</span>
        </div>
        {/* Form */}
        <form
          action=""
          className="flex flex-col justify-center items-center w-[80%] p-2"
        >
          {/* Email input */}
          <TextField
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
          >
            Submit
          </button>
          <NavLink
            to="/"
            className="hover:bg-primary border ease-linear duration-200 border-primary h-[40px] w-full text-primary hover:text-white rounded-full mt-4 flex items-center justify-center"
          >
            Head Back to Home
          </NavLink>
          {/* Don't have account link */}
          <div className="w-full mt-2">
            <NavLink to="/sign-up">
              <span className="text-sm underline text-slate-400 italic">
                Don&#39;t have an account?
              </span>
            </NavLink>
          </div>
        </form>
      </div>
    </MainThemeContainer>
  );
};

export default LoginPage;
