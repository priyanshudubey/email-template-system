import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CreateTemplate from "./CreateTemplate"; // Import CreateTemplate component
import ViewEditTemplates from "./ViewEditTemplates"; // Import ViewEditTemplates component

const TemplateHome = () => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <Link
        to="/templates/create"
        className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Create Template
      </Link>
      <Link
        to="/templates/view-edit"
        className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
        View/Edit Templates
      </Link>
    </div>
  );
};

const Template = () => {
  return (
    <div className="p-4">
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
