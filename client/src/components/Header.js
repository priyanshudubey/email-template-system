import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout(); // Call logout from context
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="w-screen bg-teal-600 font-bold shadow-black shadow-md">
      {/* Header content */}
      <div className="h-20 flex justify-between items-center text-[#545454] px-4 sm:px-6 py-2">
        <div className="w-20 sm:w-24 flex justify-center sm:justify-start">
          <img
            className="w-12 h-12 sm:w-14 sm:h-14 cursor-pointer"
            src="/favicon.png"
            alt="logo"
            onClick={() => navigate("/landingPage")}
          />
        </div>

        {/* Menu icon for small screens */}
        <div className="sm:hidden flex items-center">
          <FontAwesomeIcon
            icon={faBars}
            size="lg"
            className="cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        {/* Desktop menu items */}
        <div className="hidden sm:flex items-center text-white">
          <ul className="flex p-8 m-8 gap-4">
            <li
              className="px-4 rounded-lg font-extrabold cursor-pointer"
              onClick={() => navigate("/landingPage")}>
              Home
            </li>
            <li className="px-4 rounded-lg font-extrabold cursor-pointer">
              <Link to="/templates">Templates</Link>
            </li>
            <li
              className="px-4 rounded-lg font-extrabold cursor-pointer"
              onClick={() => navigate("/melaAI")}>
              melaAI
            </li>
            <li
              className="px-4 rounded-lg font-extrabold cursor-pointer"
              onClick={() => navigate("/profile")}>
              Profile
            </li>
          </ul>
          {username ? (
            <div className="flex items-center">
              <p className="px-4 font-extrabold">Welcome, {username}</p>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-black text-white rounded-lg font-extrabold shadow-lg">
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg font-extrabold">
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu items */}
      {isMenuOpen && (
        <div className="sm:hidden flex flex-col items-center bg-[#ffffff] shadow-md py-2">
          <ul className="w-full flex flex-col items-center space-y-2">
            <li
              className="px-4 py-2 rounded-lg font-extrabold cursor-pointer"
              onClick={() => {
                navigate("/landingPage");
                setIsMenuOpen(false);
              }}>
              Home
            </li>
            <li
              className="px-4 py-2 rounded-lg font-extrabold cursor-pointer"
              onClick={() => {
                navigate("/templates");
                setIsMenuOpen(false);
              }}>
              Templates
            </li>
            <li
              className="px-4 py-2 rounded-lg font-extrabold cursor-pointer"
              onClick={() => {
                navigate("/profile");
                setIsMenuOpen(false);
              }}>
              Profile
            </li>
          </ul>
          {username ? (
            <div className="w-full flex flex-col items-center mt-2">
              <p className="px-4 py-2 font-extrabold text-center">
                Welcome, {username}
              </p>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 mt-2 bg-teal-600 text-white rounded-lg font-extrabold">
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="px-4 py-2 mt-2 bg-teal-600 text-white rounded-lg font-extrabold">
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
