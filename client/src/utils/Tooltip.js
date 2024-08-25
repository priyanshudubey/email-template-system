import React from "react";

const Tooltip = ({ message }) => {
  return (
    <div className="relative flex items-center">
      <div className="absolute top-0 left-0 transform -translate-y-full -translate-x-2 w-max bg-black text-white text-xs rounded-lg p-2 shadow-lg">
        {message}
        <div className="absolute w-2 h-2 bg-teal-700 transform rotate-45 left-2 bottom-[-4px]"></div>
      </div>
    </div>
  );
};

export default Tooltip;
