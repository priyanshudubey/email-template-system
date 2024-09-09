import React, { useState, useEffect } from "react";
import { LiaEditSolid } from "react-icons/lia"; // Import edit icon
import { RiDeleteBin5Line } from "react-icons/ri"; // Import delete icon
import TemplateEditor from "./TemplateEditor"; // Import TemplateEditor for editing

const ViewEditTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null); // State for selected template to edit

  useEffect(() => {
    const fetchTemplates = async () => {
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
        setTemplates(data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleDelete = async (templateId) => {
    try {
      const token = localStorage.getItem("token");

      // Make DELETE request to remove the template from the backend
      const response = await fetch(
        `http://localhost:5000/templates/${templateId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // If deletion is successful, remove the template from the frontend
        setTemplates(
          templates.filter((template) => template.id !== templateId)
        );
      } else {
        const data = await response.json();
        alert(`Error deleting template: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting template:", error);
      alert("An error occurred while deleting the template.");
    }
  };

  const handleEdit = (template) => {
    setSelectedTemplate(template); // Set the template to be edited
  };

  return (
    <div className="mt-4">
      {selectedTemplate ? (
        // Render TemplateEditor with the selected template for editing
        <TemplateEditor template={selectedTemplate} />
      ) : (
        <>
          {loading ? (
            <p className="text-gray-500">Loading templates...</p>
          ) : templates.length > 0 ? (
            <ul className="space-y-4">
              {templates.map((template) => (
                <li
                  key={template.id}
                  className="relative p-4 border rounded-lg shadow-sm shadow-black bg-teal-600">
                  <h3 className="text-lg font-bold mb-2">{template.subject}</h3>
                  <p className="text-sm text-white">
                    Created on: {new Date(template.created_at).toLocaleString()}
                  </p>

                  {/* Edit and Delete Icons */}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(template)} // Pass the entire template object
                      className="p-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600 transition">
                      <LiaEditSolid size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(template.id)} // Handle deletion
                      className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition">
                      <RiDeleteBin5Line size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No templates found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ViewEditTemplates;
