import React, { useRef, useEffect } from "react";
import "quill/dist/quill.snow.css"; // Import Quill's styles
import Quill from "quill";
import "./TextEditor.css"; // Import your custom CSS

const TextEditor = () => {
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
    <div className="editor-container">
      <div
        ref={editorContainerRef}
        className="editor"></div>
      <button
        id="saveButton"
        className="save-button">
        Save
      </button>
    </div>
  );
};

export default TextEditor;
