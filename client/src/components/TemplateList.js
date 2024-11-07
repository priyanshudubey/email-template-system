import React from "react";
import TemplateListItem from "./TemplateListItem";

const TemplateList = ({ templates, onDelete, onEdit, onExecute }) => (
  <ul className="space-y-4">
    {templates.map((template) => (
      <TemplateListItem
        key={template.id}
        template={template}
        onDelete={() => onDelete(template.id)}
        onEdit={() => onEdit(template)}
        onExecute={() => onExecute(template)}
      />
    ))}
  </ul>
);

export default TemplateList;
