import React, { useRef, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import TemplateModal from "./TemplateModal";
import mustache from "mustache";
import { AiOutlineQuestionCircle, AiOutlineClose } from "react-icons/ai";

const TemplateEditor = ({ template, formData, setFormData }) => {
  const editorContainerRef = useRef(null);
  const quillRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState(template ? template.subject : "");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Function to toggle the help popup
  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

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
          <label className="h-10 text-white font-bold bg-teal-600 hover:bg-teal-500 rounded-lg px-3 flex items-center">
            Subject:
          </label>
          <input
            className="w-full h-10 pl-3 py-2 border rounded"
            placeholder="Enter your Email Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <button
            className="mt-4 text-white bg-teal-600 hover:bg-teal-500 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
            onClick={toggleHelp}>
            <AiOutlineQuestionCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-teal-500 rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={toggleHelp}>
              <AiOutlineClose className="w-5 h-5" />
            </button>

            {/* Help Content */}
            <h2 className="text-2xl font-semibold text-black mb-4">
              Instructions
            </h2>
            <div className="pl-6">
              {" "}
              {/* Add padding-left for indentation */}
              <p className="text-black mb-3 text-left">
                <strong>Placeholders:</strong> Use{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">{`{{placeholder_name}}`}</code>{" "}
                to insert placeholders in your template.
              </p>
              <p className="text-black mb-3 text-left">
                <strong>Sections:</strong> Wrap sections using{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">{`{{#SectionName}}`}</code>{" "}
                to start a section and{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">{`{{/SectionName}}`}</code>{" "}
                to end the section.
              </p>
              <p className="text-black mb-3 text-left">
                <strong>Example:</strong>{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">{`{{#ImportantMessage}}`}</code>
                Your message goes here.
                <code className="bg-gray-100 px-1 py-0.5 rounded">{`{{/ImportantMessage}}`}</code>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-60">
        <div
          ref={editorContainerRef}
          className="editor">
          Type here.....
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="p-4 m-4 bg-teal-600 hover:bg-teal-500 text-white rounded-lg">
          {loading ? "Saving..." : "Save"}
        </button>
        <button className="p-4 m-4 bg-teal-600 hover:bg-teal-500 text-white rounded-lg">
          Send E-mail
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {template && (
        <TemplateModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
          template={template}
        />
      )}

      {showSuccess && (
        <div className="text-teal-500 mt-4">Email saved successfully!</div>
      )}
    </div>
  );
};

export default TemplateEditor;
