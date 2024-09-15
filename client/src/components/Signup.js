import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validation, validatePasswordsMatch } from "../utils/validate"; // Import validation functions
import Tooltip from "../utils/Tooltip";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSignUpClick = async (event) => {
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
      try {
        setLoading(true);
        // Send POST request to the signup API
        const response = await axios.post("http://localhost:5000/signup", {
          username: email.current.value.split("@")[0], // Example: Use email prefix as username
          email: email.current.value,
          password: password.current.value,
        });

        console.log(response.data.message); // Success message from server
        navigate("/home"); // Redirect to the home page or wherever after successful signup
      } catch (error) {
        console.error("Signup error:", error);
        setErrors({ server: "Signup failed. Please try again." });
      } finally {
        setLoading(false);
      }
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
        <form className="relative w-full m-12 p-12 md:w-3/12 mx-auto text-white bg-teal-600 rounded-lg shadow-black shadow-2xl">
          <img
            className="h-20 mx-auto"
            src="/logo.png"
            alt="logo"
          />
          <br />
          <div className="relative">
            <input
              ref={email}
              className="p-2 my-4 w-full rounded-lg bg-black shadow-black shadow-lg"
              type="email"
              name="email"
              placeholder="Email"
            />
            {errors.email && <Tooltip message={errors.email} />}
          </div>
          <div className="relative">
            <input
              ref={password}
              className="p-2 my-4 w-full rounded-lg bg-black shadow-black shadow-lg"
              type="password"
              name="password"
              placeholder="Password"
            />
            {errors.password && <Tooltip message={errors.password} />}
          </div>
          <div className="relative">
            <input
              ref={confirmPassword}
              className="p-2 my-4 w-full rounded-lg bg-black shadow-black shadow-lg"
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <Tooltip message={errors.confirmPassword} />
            )}
          </div>
          <button
            onClick={handleSignUpClick}
            className="p-4 my-4 bg-black w-full rounded-lg font-extrabold shadow-black shadow-lg"
            type="submit"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {errors.server && (
            <p className="text-red-500 text-center">{errors.server}</p>
          )}
          <div className="text-center">
            <p className="text-center text-white">Already have an account?</p>
            <button
              onClick={handleLoginClick}
              className="text-black font-bold"
              type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
