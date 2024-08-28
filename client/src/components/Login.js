import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validation } from "../utils/validate";
import Tooltip from "../utils/Tooltip";

const Login = () => {
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleLoginClick = (event) => {
    event.preventDefault();

    const userCredentials = {
      email: email.current.value,
      password: password.current.value,
    };

    const validationErrors = validation(userCredentials);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Login successful!");
      navigate("/home");
    } else {
      setErrors(validationErrors);
      console.log(validationErrors);
      console.log("Validation failed!");
    }
  };

  const handleSignUpClick = (event) => {
    event.preventDefault();
    navigate("/Signup");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form className="relative w-full m-20 p-12 md:w-3/12 mx-auto text-white bg-orange-700 rounded-lg">
        <img
          className=""
          src="/logo.png"
          alt="logo"
        />
        <br />
        <div className="relative">
          <input
            ref={email}
            className="p-2 my-4 w-full rounded-lg bg-black"
            type="email"
            name="email"
            placeholder="Email"
          />
          {errors.email && <Tooltip message={errors.email} />}
        </div>
        <br />
        <div className="relative">
          <input
            ref={password}
            className="p-2 my-4 w-full rounded-lg bg-black"
            type={showPassword ? "text" : "password"} // Toggle between text and password
            name="password"
            placeholder="Password"
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white">
            {showPassword ? "🙈" : "👁️"} {/* Eye icon */}
          </span>
          {errors.password && <Tooltip message={errors.password} />}
        </div>
        <br />
        <button
          onClick={handleLoginClick}
          className="p-4 my-4 bg-black w-full rounded-lg font-extrabold"
          type="submit">
          Login
        </button>
        <br />
        <p className="text-center text-white">Don't have an account?</p>
        <button
          onClick={handleSignUpClick}
          className="p-4 my-4 bg-black w-full rounded-lg font-extrabold"
          type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
