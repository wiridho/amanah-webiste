import React from "react";

const Badge = ({ className, children }) => {
  return (
    <span
      className={`px-2 py-0.5 ml-auto text-xs font-medium tracking-wide  bg-green-50 rounded-full ${className} `}
    >
      {children}
    </span>
  );
};

export default Badge;
