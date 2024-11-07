import React, { useState, useEffect } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import TemplateEditor from "./TemplateEditor";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import RawTemplateEditor from "./RawTemplateEditor"; // Import RawTemplateEditor
import axios from "axios";

const ViewEditTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null); // State to store errors
  const [editingTemplate, setEditingTemplate] = useState(null); // For editing template
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      setError(null); // Reset error state on each fetch
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/templates", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch templates. Please try again.");
        }

        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error("Error fetching templates:", error);
        setError(error.message); // Set the error message to state
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleDelete = async (templateId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/templates/${templateId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error deleting template.");
      }

      setTemplates(templates.filter((template) => template.id !== templateId));
    } catch (error) {
      console.error("Error deleting template:", error);
      alert(`An error occurred while deleting the template: ${error.message}`);
    }
  };

  const handleExecute = (template) => {
    setSelectedTemplate(template);
    setShowModal(true);
  };

  const handleEdit = async (template) => {
    // Fetch the raw template data (only subject and email) for editing
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/templates/${template.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        "Fetching template at URL:",
        `http://localhost:5000/templates/${template.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch template details.");
      }

      const templateData = await response.json();
      console.log("Fetched template data:", templateData);
      setEditingTemplate(templateData); // Set the template data for editing
      setShowModal(true); // Open modal
    } catch (error) {
      console.error("Error fetching template:", error);
      alert("Failed to load template for editing.");
    }
  };

  const handleUpdate = async (updatedTemplate) => {
    console.log("Updated template: ", updatedTemplate);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/templates/${updatedTemplate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            subject: updatedTemplate.subject,
            email: updatedTemplate.email,
          }),
        }
      );
      const updat = await response.data; // Use .data to access the actual response data
      console.log("Updated template data:", updat);

      if (!response.ok) {
        throw new Error("Failed to update template.");
      }

      const updatedTemplateData = await response.json();
      setTemplates(
        templates.map((template) =>
          template.id === updatedTemplateData.id
            ? updatedTemplateData
            : template
        )
      );
      setShowModal(false);
      alert("Template successfully updated.");
    } catch (error) {
      console.error("Error updating template:", error);
      alert("Failed to update template.");
    }
  };
  // const handleUpdate = async (updatedTemplate) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.put(
  //       `http://localhost:5000/templates/${updatedTemplate.id}`,
  //       updatedTemplate,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // Get the response data and log it
  //     const updatedTemplateData = await response.data; // Use .data to access the actual response data
  //     console.log("Updated template data:", updatedTemplateData); // Log the updated template data

  //     if (response.status === 200) {
  //       setSuccessMessage("Template successfully updated.");

  //       // Update the templates list to reflect the updated template
  //       setTemplates((prevTemplates) => {
  //         return prevTemplates.map((template) =>
  //           template.id === updatedTemplate.id ? updatedTemplateData : template
  //         );
  //       });

  //       // Optionally, update the selectedTemplate if it's the one being updated
  //       if (selectedTemplate && selectedTemplate.id === updatedTemplate.id) {
  //         setSelectedTemplate(updatedTemplateData);
  //       }

  //       setTimeout(() => {
  //         setSuccessMessage("");
  //       }, 5000);
  //     }
  //   } catch (error) {
  //     console.error("Error updating template:", error);
  //     alert("Failed to update template.");
  //   }
  // };

  const handleModalSubmit = (formData) => {
    console.log("Form Data from Modal:", formData);
    setFormData(formData);
    setShowModal(false);
  };

  const handleViewEditTemplates = () => {
    setSelectedTemplate(null);
    setShowModal(false); // Close modal if opened
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {/* Buttons on the top, aligned to the right */}
      {selectedTemplate && (
        <div className="flex justify-end items-center mb-6 space-x-4">
          <Link
            to="/templates/create"
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition">
            Create Template
          </Link>
          <button
            onClick={handleViewEditTemplates}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition">
            View/Edit Templates
          </button>
        </div>
      )}

      {/* Main content for template viewing/editing */}
      {selectedTemplate ? (
        <TemplateEditor
          template={selectedTemplate}
          formData={formData}
          setFormData={setFormData}
        />
      ) : (
        <>
          {loading ? (
            <p className="text-gray-500">Loading templates...</p>
          ) : templates.length > 0 ? (
            <ul className="space-y-4">
              {templates.map((template) => (
                <li
                  key={template.id}
                  className="relative p-4 border rounded-lg shadow-sm bg-teal-600">
                  {/* Subject and Info aligned */}
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white">
                      {template.subject}
                    </h3>
                    <span className="absolute left-1/2 transform -translate-x-1/2 text-sm text-white">
                      Created on:{" "}
                      {new Date(template.created_at).toLocaleString()}
                    </span>
                  </div>

                  {/* Edit and Delete Icons */}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    {/* Execute Button */}
                    <button
                      onClick={() => handleExecute(template)}
                      className="p-2 text-black bg-white rounded-full hover:bg-yellow-600 transition"
                      title="Execute Template">
                      <BsFillSendArrowUpFill size={20} />
                    </button>
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(template)}
                      className="p-2 text-white bg-green-400 rounded-full hover:bg-yellow-600 transition"
                      title="Edit Template">
                      <LiaEditSolid size={20} />
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(template.id)}
                      className="p-2 text-white bg-red-600 rounded-full hover:bg-yellow-600 transition"
                      title="Delete Template">
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

      {/* Modal to show Raw Template Editor when editing */}
      {showModal && editingTemplate && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-3/4 max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Edit Template</h2>
            {/* Render RawTemplateEditor component */}
            <RawTemplateEditor templateContent={editingTemplate.email} />
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 transition">
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(editingTemplate)}
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEditTemplates;
