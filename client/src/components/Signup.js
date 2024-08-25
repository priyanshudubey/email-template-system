import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validation, validatePasswordsMatch } from "../utils/validate"; // Import validation functions
import Tooltip from "../utils/Tooltip";

const Signup = () => {
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const [errors, setErrors] = useState({});

  const handleSignUpClick = (event) => {
    event.preventDefault();

    const userCredentials = {
      email: email.current.value,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value,
    };

    // Combine validation results
    const validationErrors = {
      ...validation(userCredentials),
      ...validatePasswordsMatch(
        userCredentials.password,
        userCredentials.confirmPassword
      ),
    };

    if (Object.keys(validationErrors).length === 0) {
      console.log("Signup successful!");
      navigate("/home"); // Redirect to the home page or wherever after successful signup
    } else {
      setErrors(validationErrors);
      console.log(validationErrors);
      console.log("Validation failed!");
    }
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <div>
        <form className="absolute w-full m-20 p-12 md:w-3/12 mx-auto right-0 left-0 text-white bg-orange-700 rounded-lg">
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
              type="password"
              name="password"
              placeholder="Password"
            />
            {errors.password && <Tooltip message={errors.password} />}
          </div>
          <br />
          <div className="relative">
            <input
              ref={confirmPassword}
              className="p-2 my-4 w-full rounded-lg bg-black"
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <Tooltip message={errors.confirmPassword} />
            )}
          </div>
          <br />
          <button
            onClick={handleSignUpClick}
            className="p-4 my-4 bg-black w-full rounded-lg font-extrabold"
            type="submit">
            Sign Up
          </button>
          <br />
          <p className="text-center text-white">Already have an account?</p>
          <button
            onClick={handleLoginClick}
            className="p-4 my-4 bg-black w-full rounded-lg font-extrabold"
            type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
