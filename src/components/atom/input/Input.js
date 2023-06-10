import React, { Children } from "react";

const Input = ({ className, type }) => {
  return (
    <input
      type={type}
      className={`w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 focus:ring-1 outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
    />
  );
};

export default Input;
