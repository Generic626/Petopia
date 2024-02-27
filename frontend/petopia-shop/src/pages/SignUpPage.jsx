import brandLogo from "../assets/petopia-brand.png";
import MainThemeContainer from "../components/UI/MainThemeContainer";
import { TextField, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const SignUpPage = () => {
  // set title page name
  useEffect(() => {
    document.title = "Sign-up"; // Set the desired page title
    return () => {
      document.title = "Petopia"; // Reset the title when the component unmounts
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState({});

  return (
    <MainThemeContainer className="flex justify-center items-center">
      <div className="h-[765px] w-[505px] rounded-[20px] bg-white flex flex-col justify-center items-center">
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
          {/* Name */}
          <TextField
            margin="dense"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name != undefined}
            helperText={errors.name}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password != undefined}
            helperText={errors.password}
          />
          {/* Password input */}
          <TextField
            margin="dense"
            required
            fullWidth
            name="password"
            label="Enter password again"
            type="password"
            id="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            // error={errors.password != undefined}
            // helperText={errors.password}
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary h-[40px] w-full text-white rounded-full mt-4"
          >
            Submit
          </button>
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
