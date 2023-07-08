import React from "react";

const Label = ({ children, className, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 my-2 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
