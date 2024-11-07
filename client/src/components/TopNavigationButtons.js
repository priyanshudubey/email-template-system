import React from "react";
import { Link } from "react-router-dom";

const TopNavigationButtons = ({ onDeselect }) => (
  <div className="flex justify-end items-center mb-6 space-x-4">
    <Link
      to="/templates/create"
      className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition">
      Create Template
    </Link>
    <button
      onClick={onDeselect}
      className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition">
      View/Edit Templates
    </button>
  </div>
);

export default TopNavigationButtons;
