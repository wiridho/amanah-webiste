import React from "react";

const Button = ({ children, className, type, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`py-2 px-4 rounded-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
