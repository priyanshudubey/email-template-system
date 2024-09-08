import React, { useRef, useEffect, useState } from "react";
import "quill/dist/quill.snow.css"; // Import Quill's styles
import Quill from "quill";
import "./TextEditor.css";

const TemplateEditor = () => {
  const editorContainerRef = useRef(null);
  const quillRef = useRef(null);
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (editorContainerRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorContainerRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }], // Header options
            [{ size: ["small", false, "large", "huge"] }], // Text size options
            [{ list: "ordered" }, { list: "bullet" }], // List options
            ["bold", "italic", "underline"], // Formatting options
            [{ color: [] }], // Text color options
            ["link"], // Link option
            ["clean"], // Clear formatting option
          ],
        },
      });
    }
  }, []);

  // Handle form submission and saving to the backend
  const handleSave = async () => {
    if (quillRef.current) {
      const emailContent = quillRef.current.root.innerHTML;
      const token = localStorage.getItem("token");

      if (!subject) {
        alert("Please enter a subject");
        return;
      }

      setLoading(true);

      try {
        // Send POST request to the backend API
        const response = await fetch("http://localhost:5000/templates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
          body: JSON.stringify({
            subject,
            email: emailContent,
          }),
        });

        const data = await response.json();
        console.log("New data from text editor file: ", data);
        if (response.ok) {
          setShowSuccess(true); // Show success message
          setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds
        } else {
          alert(`Error saving template: ${data.message}`);
        }
      } catch (error) {
        console.error("Error saving template:", error);
        alert("An error occurred while saving the template.");
      } finally {
        setLoading(false);
      }
    }
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
            onChange={(e) => setSubject(e.target.value)} // Update subject state
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

      {/* Success Message */}
      {showSuccess && (
        <div
          role="alert"
          className="mb-4 relative flex w-full p-3 text-sm text-white bg-green-600 rounded-md">
          Template saved successfully!
          <button
            className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5"
            type="button"
            onClick={() => setShowSuccess(false)} // Close the message manually
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateEditor;
