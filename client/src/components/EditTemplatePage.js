import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RawTemplateEditor from "./RawTemplateEditor";

const EditTemplatePage = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [emailContent, setEmailContent] = useState("");

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/templates/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch template details.");
        }

        const templateData = await response.json();
        setTemplate(templateData);
        setEmailContent(templateData.email); // Initialize email content
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };

    fetchTemplate();
  }, [id]);

  const handleContentChange = (newContent) => {
    setEmailContent(newContent); // Update state with new content
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/templates/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...template,
          email: emailContent, // Update email content
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the template.");
      }

      alert("Template updated successfully!");
    } catch (error) {
      console.error("Error updating template:", error);
      alert("Failed to update the template.");
    }
  };

  if (!template) {
    return <p>Loading template...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Template</h1>
      <RawTemplateEditor
        templateContent={emailContent}
        onContentChange={handleContentChange}
      />
      {/* Update button to save the changes */}
      <button
        className="bg-teal-600 text-white rounded-lg p-4 m-4"
        onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default EditTemplatePage;
