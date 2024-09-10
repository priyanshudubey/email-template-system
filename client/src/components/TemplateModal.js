// TemplateModal.js
import React, { useState, useEffect } from "react";

const TemplateModal = ({ show, onHide, onSubmit, template }) => {
  const [formData, setFormData] = useState({});
  const [templateDetails, setTemplateDetails] = useState({
    sections: [],
    placeholders: [],
  });

  useEffect(() => {
    const fetchTemplateDetails = async () => {
      if (!template) return;

      const response = await fetch(
        `http://localhost:5000/api/templates/template-details?templateId=${template.id}`
      );
      if (!response.ok) {
        console.error("Failed to fetch template details");
        return;
      }

      const data = await response.json();
      console.log("Template details fetched:", data);

      const initialFormData = {};
      data.sections.forEach((section) => (initialFormData[section] = false));
      data.placeholders.forEach(
        (placeholder) => (initialFormData[placeholder] = "")
      );
      console.log("Initial form data:", initialFormData);
      setFormData(initialFormData);
      setTemplateDetails(data);
    };

    fetchTemplateDetails();
  }, [template]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className={`modal ${show ? "show" : "hide"}`}>
      <div className="modal-content">
        <button onClick={onHide}>Close</button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}>
          {templateDetails.placeholders.map((placeholder) => (
            <div key={placeholder}>
              <label>{placeholder}</label>
              <input
                type="text"
                name={placeholder}
                value={formData[placeholder] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
          {templateDetails.sections.map((section) => (
            <div key={section}>
              <label>
                <input
                  type="checkbox"
                  name={section}
                  checked={formData[section] || false}
                  onChange={handleCheckboxChange}
                />
                {section}
              </label>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TemplateModal;
