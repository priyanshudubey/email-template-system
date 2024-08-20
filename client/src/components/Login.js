import React from "react";

const Login = () => {
  return (
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
          type="text"
          name="username"
          placeholder="Username"
        />
        <br />
        <input
          className="p-2 my-4 w-full rounded-lg bg-black"
          type="password"
          name="password"
          placeholder="Password"
        />
        <br />
        <button
          className="p-4 my-4 bg-black w-full rounded-lg font-extrabold"
          type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
