import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validation } from "../utils/validate";
import Tooltip from "../utils/Tooltip";
import { useAuth } from "../utils/authContext";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginClick = async (event) => {
    event.preventDefault();

    const userCredentials = {
      email: email.current.value,
      password: password.current.value,
    };

    const validationErrors = validation(userCredentials);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCredentials),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          login(data.token); // Call login function from context
          console.log("Navigating to home");
          navigate("/landingPage");
        } else {
          setErrors({ general: data.message });
        }
      } catch (error) {
        setErrors({ general: "Server error. Please try again later." });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSignUpClick = (event) => {
    event.preventDefault();
    navigate("/signup");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form className="relative w-full m-12 p-12 md:w-3/12 mx-auto text-white bg-teal-600 rounded-lg shadow-black shadow-2xl">
        <img
          className="h-20 mx-auto"
          src="/logo.png"
          alt="e-Temp logo"
        />
        <br />
        <div className="relative">
          <label
            htmlFor="email"
            className="flex items-center gap-2 text-md font-medium text-white">
            <FiMail className="text-white" />
            Email
          </label>
          <input
            ref={email}
            className="p-4 my-2 w-full rounded-lg bg-black shadow-black shadow-lg"
            type="email"
            name="email"
            placeholder=""
          />
          {errors.email && <Tooltip message={errors.email} />}
        </div>
        <div className="relative">
          <label className="flex items-center gap-2 text-md font-medium text-white">
            <FiLock className="text-white" />
            Password
          </label>
          <input
            ref={password}
            className="p-4 my-2 w-full rounded-lg bg-black shadow-black shadow-lg"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white">
            {showPassword ? (
              <FiEyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <FiEye className="h-5 w-5 text-gray-400" />
            )}
          </span>
          {errors.password && <Tooltip message={errors.password} />}
        </div>
        <button
          onClick={handleLoginClick}
          className="p-4 my-4 bg-black w-full rounded-lg font-extrabold hover:bg-gray-500 shadow-black shadow-lg transition-all"
          type="submit">
          Sign In
        </button>
        <div className="text-center">
          <p className="text-center text-white">Don't have an account?</p>
          <button
            onClick={handleSignUpClick}
            className="text-black font-bold"
            type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
