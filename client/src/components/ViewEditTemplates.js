import React, { useState, useEffect } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import TemplateEditor from "./TemplateEditor";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ViewEditTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

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
    setSelectedTemplate(template);
    setShowModal(true);
  };

  const handleModalSubmit = (formData) => {
    console.log("Form Data from Modal:", formData);
    setFormData(formData);
    setShowModal(false);
  };

  const handleViewEditTemplates = () => {
    setSelectedTemplate(null); // Reset selected template
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
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
                  className="relative p-4 border rounded-lg shadow-sm shadow-black bg-teal-600">
                  {/* Subject and Info aligned */}
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white">
                      {template.subject}
                    </h3>
                    <span className="text-sm text-white">
                      Created on:{" "}
                      {new Date(template.created_at).toLocaleString()}
                    </span>
                  </div>

                  {/* Edit and Delete Icons */}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    {/* Execute Button */}
                    <button
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
                      className="p-2 text-white bg-red-400 rounded-full hover:bg-red-600 transition"
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
    </div>
  );
};

export default ViewEditTemplates;
