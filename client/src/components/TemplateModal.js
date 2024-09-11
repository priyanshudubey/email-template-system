import React, { useState, useEffect } from "react";
// import "./ModalStyles.css";

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
      <div className="bg-teal-600 m-2 p-2 rounded-lg shadow-md shadow-black">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}>
          {templateDetails.placeholders.map((placeholder) => (
            <div
              className="text-left"
              key={placeholder}>
              <label className=" rounded-lg text-white font-bold">
                {placeholder}
              </label>
              <input
                className="w-48 p-2 m-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="text"
                name={placeholder}
                value={formData[placeholder] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
          {templateDetails.sections.map((section) => (
            <div
              key={section}
              className="space-x-2">
              <label className="flex items-center">
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  type="checkbox"
                  name={section}
                  checked={formData[section] || false}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2 text-white min-w-[150px] text-left">
                  {section}
                </span>
              </label>
            </div>
          ))}
          <button
            className="bg-black text-white m-2 p-2 rounded-lg"
            onClick={onHide}>
            Close
          </button>
          <button
            className="bg-black text-white rounded-lg m-2 p-2"
            type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TemplateModal;
