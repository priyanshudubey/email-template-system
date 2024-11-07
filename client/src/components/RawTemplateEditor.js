import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const RawTemplateEditor = ({ templateContent }) => {
  const editorContainerRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorContainerRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorContainerRef.current, {
        theme: "snow",
        modules: {
          toolbar: false, // No toolbar for raw template editing
        },
      });

      // Set the raw template content inside the editor
      quillRef.current.root.innerHTML = templateContent;
    }
  }, [templateContent]);

  return (
    <div className="w-full h-60 overflow-y-auto border border-gray-300 rounded mb-6">
      <div
        ref={editorContainerRef}
        className="editor h-full"></div>
    </div>
  );
};

export default RawTemplateEditor;
