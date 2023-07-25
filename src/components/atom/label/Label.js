import React from "react";

const Label = ({ children, className, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-[13px] font-medium text-gray-700 my-[6px] ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
