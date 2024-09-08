import React, { useState } from "react";
import TemplateEditor from "./TemplateEditor"; // Import the TemplateEditor component

const Template = () => {
  const [view, setView] = useState("buttons"); // State to control the view
  const [templates, setTemplates] = useState([]); // State to hold fetched templates
  const [loading, setLoading] = useState(false); // Loading state

  const handleCreateTemplateClick = () => {
    setView("create");
  };

  const handleViewEditTemplatesClick = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/templates", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("data: ", data);
      setTemplates(data);
      setView("viewEdit");
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {view === "buttons" && (
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleCreateTemplateClick}
            className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Create Template
          </button>
          <button
            onClick={handleViewEditTemplatesClick}
            className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            View/Edit Templates
          </button>
        </div>
      )}

      {view === "create" && (
        <div className="mt-4">
          <TemplateEditor />
        </div>
      )}

      {view === "viewEdit" && (
        <div className="mt-4">
          {loading ? (
            <p className="text-gray-500">Loading templates...</p>
          ) : templates.length > 0 ? (
            <ul className="space-y-4">
              {templates.map((template) => (
                <li
                  key={template.id}
                  className="p-4 border rounded-lg shadow-sm shadow-black bg-teal-600">
                  <h3 className="text-lg font-bold mb-2">{template.subject}</h3>
                  <p className="text-sm text-white">
                    Created on: {new Date(template.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No templates found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Template;
