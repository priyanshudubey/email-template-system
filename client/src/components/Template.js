import React, { useState } from "react";
import TemplateEditor from "./TemplateEditor"; // Import the TemplateEditor component

const Template = () => {
  const [view, setView] = useState("buttons"); // State to control the view

  const handleCreateTemplateClick = () => {
    setView("create");
  };

  const handleViewEditTemplatesClick = () => {
    setView("viewEdit");
  };

  return (
    <div className="template-page-container">
      {view === "buttons" && (
        <div className="buttons-container">
          <button
            onClick={handleCreateTemplateClick}
            className="p-4 m-4 bg-blue-500 text-white rounded-lg">
            Create Template
          </button>
          <button
            onClick={handleViewEditTemplatesClick}
            className="p-4 m-4 bg-green-500 text-white rounded-lg">
            View/Edit Templates
          </button>
        </div>
      )}

      {view === "create" && (
        <div className="create-template-container">
          <TemplateEditor />
        </div>
      )}

      {view === "viewEdit" && (
        <div className="view-edit-templates-container">
          {/* Placeholder for View/Edit Templates */}
          <p>View/Edit Templates - Coming soon!</p>
          {/* You can replace the above line with actual logic to display existing templates */}
        </div>
      )}
    </div>
  );
};

export default Template;
