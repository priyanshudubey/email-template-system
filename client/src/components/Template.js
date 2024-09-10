import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CreateTemplate from "./CreateTemplate"; // Import CreateTemplate component
import ViewEditTemplates from "./ViewEditTemplates"; // Import ViewEditTemplates component
import { FaRegEdit } from "react-icons/fa"; // Import icons for better visuals
import { RiFileEditLine } from "react-icons/ri";

const TemplateHome = () => {
  return (
    <div className="p-6 bg-teal-600 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Manage Your Templates
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/templates/create"
          className="flex flex-col items-center p-6 bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition transform hover:scale-105">
          <FaRegEdit className="text-4xl mb-4 text-yellow-300" />
          <h2 className="text-2xl font-semibold mb-2">Create Template</h2>
          <p>Create and design your email templates easily.</p>
        </Link>
        <Link
          to="/templates/view-edit"
          className="flex flex-col items-center p-6 bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition transform hover:scale-105">
          <RiFileEditLine className="text-4xl mb-4 text-yellow-300" />
          <h2 className="text-2xl font-semibold mb-2">View/Edit Templates</h2>
          <p>Manage existing templates, view and edit as needed.</p>
        </Link>
      </div>
    </div>
  );
};

const Template = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Routes>
        {/* Route for Template Home (buttons) */}
        <Route
          path="/"
          element={<TemplateHome />}
        />

        {/* Route for Create Template */}
        <Route
          path="/create"
          element={<CreateTemplate />}
        />

        {/* Route for View/Edit Templates */}
        <Route
          path="/view-edit"
          element={<ViewEditTemplates />}
        />
      </Routes>
    </div>
  );
};

export default Template;
