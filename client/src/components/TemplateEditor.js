import React, { useRef, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import TemplateModal from "./TemplateModal";
import mustache from "mustache";

const TemplateEditor = ({ template, formData, setFormData }) => {
  const editorContainerRef = useRef(null);
  const quillRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState(template ? template.subject : "");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (editorContainerRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorContainerRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ color: [] }],
            ["link"],
            ["clean"],
          ],
        },
      });

      if (template && template.email) {
        quillRef.current.root.innerHTML = template.email;
      }
    }
  }, [template]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const emailContent = quillRef.current.root.innerHTML;
      const url = template
        ? `http://localhost:5000/templates/${template.id}`
        : "http://localhost:5000/templates";
      const method = template ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          subject,
          email: emailContent,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        console.error("Failed to save the email.");
      }
    } catch (error) {
      console.error("Error saving email:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quillRef.current && template) {
      console.log("Template email content:", template.email);
      console.log("Current form data:", formData);

      if (formData) {
        const parsedTemplate = mustache.render(template.email, formData);
        console.log("Parsed template content:", parsedTemplate);

        quillRef.current.root.innerHTML = parsedTemplate;
      } else {
        console.error("Form data is undefined or empty");
      }
    }
  }, [template, formData]);

  const handleModalSubmit = (formData) => {
    console.log("Form Data from Modal:", formData);
    setFormData(formData); // Update formData state
    setShowModal(false); // Close modal
  };

  return (
    <div>
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl relative mt-4 p-4">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <label className="h-10 text-white font-bold bg-teal-600 rounded-lg px-3 flex items-center">
            Subject:
          </label>
          <input
            className="w-full h-10 pl-3 py-2 border rounded"
            placeholder="Enter your Email Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
      </div>

      <div className="editor-container">
        <div
          ref={editorContainerRef}
          className="editor"></div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="p-4 m-4 bg-teal-600 text-white rounded-lg">
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {template && (
        <TemplateModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
          template={template}
        />
      )}

      {showSuccess && (
        <div className="text-green-500 mt-4">Email saved successfully!</div>
      )}
    </div>
  );
};

export default TemplateEditor;
