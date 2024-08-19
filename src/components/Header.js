import React from "react";

const Header = () => {
  return (
    <div className="w-screen h-20 flex justify-between items-center text-[#545454] px-6 py-0 bg-[#ffffff] shadow-[-2px_7px_5px_-6px_#0000009c] font-bold">
      <div className="w-24">
        <img
          className="w-14 h-14 rounded-full cursor-pointer"
          src="/favicon.png"
          alt="logo"
        />
      </div>
      <div className="flex items-center">
        <ul className="flex p-8 m-8 gap-4">
          <li className="px-4  rounded-lg font-extrabold">Home</li>
          <li className="px-4  rounded-lg font-extrabold">Templates</li>
          <li className="px-4  rounded-lg font-extrabold">Profile</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
