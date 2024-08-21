import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

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
          <input
            className="p-2 my-4 w-full rounded-lg bg-black"
            type="email"
            name="email"
            placeholder="Email"
          />
          <br />
          <input
            className="p-2 my-4 w-full rounded-lg bg-black"
            type="password"
            name="password"
            placeholder="Password"
          />
          <br />
          <input
            className="p-2 my-4 w-full rounded-lg bg-black"
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
          />
          <br />
          <button
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
