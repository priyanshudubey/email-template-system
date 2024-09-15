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
      <p className="mb-8">
        Choose an action to get started with your email templates.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/templates/create"
          className="flex flex-col items-center p-6 bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition transform hover:scale-105">
          <FaRegEdit className="text-4xl mb-4 text-yellow-300" />
          <h2 className="text-2xl font-semibold mb-2">Create Template</h2>
          <p>Create and design your email templates easily.</p>
          <p className="text-black font-bold mt-4">
            Start with a blank canvas and create a custom email template
            tailored to your needs. Our intuitive editor makes it easy to design
            professional-looking emails.
          </p>
        </Link>
        <Link
          to="/templates/view-edit"
          className="flex flex-col items-center p-6 bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition transform hover:scale-105">
          <RiFileEditLine className="text-4xl mb-4 text-yellow-300" />
          <h2 className="text-2xl font-semibold mb-2">View/Edit Templates</h2>
          <p>Manage existing templates, view and edit as needed.</p>
          <p className="text-black font-bold mt-4">
            Access your saved templates to view, edit, or use them for your
            email campaigns. Keep your templates up-to-date and ready for any
            occasion.
          </p>
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
