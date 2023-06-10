import React from "react";

const Label = ({ children }) => {
  return (
    <label className="block text-sm font-medium leading-6 text-gray-900">
      {children}
    </label>
  );
};

export default Label;
