import React, { useRef, useEffect } from "react";
import "quill/dist/quill.snow.css"; // Import Quill's styles
import Quill from "quill";
import "./TextEditor.css"; // Import your custom CSS

const TemplateEditor = () => {
  const editorContainerRef = useRef(null);
  const quillRef = useRef(null);

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

    const handleSave = () => {
      if (quillRef.current) {
        const editorContent = quillRef.current.root.innerHTML;
        const blob = new Blob([editorContent], {
          type: "text/html;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "editor-content.html";
        a.click();
        URL.revokeObjectURL(url);
      }
    };

    const saveButton = document.getElementById("saveButton");
    if (saveButton) {
      saveButton.addEventListener("click", handleSave);
    }

    return () => {
      if (saveButton) {
        saveButton.removeEventListener("click", handleSave);
      }
    };
  }, []);

  return (
    <div>
      <div class="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl relative mt-4 p-4">
        <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <label class="h-10 text-white font-bold bg-teal-600 rounded-lg px-3 flex items-center">
            Subject:
          </label>
          <input
            class="w-full h-10 pl-3 py-2 border rounded"
            placeholder="Enter your Email Subject"
          />
        </div>
      </div>

      <div className="editor-container">
        <div
          ref={editorContainerRef}
          className="editor"></div>
        <button
          id="saveButton"
          className="p-4 m-4 bg-teal-600 text-white rounded-lg">
          Save
        </button>
      </div>
    </div>
  );
};

export default TemplateEditor;
