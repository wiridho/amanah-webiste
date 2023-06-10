import React from "react";
import { Link } from "react-router-dom";
import ButtonIcon from "../button-icon/ButtonIcon";

const CustomLink = ({ children, to, className, icon }) => {
  return (
    <Link
      to={to}
      className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${className}`}
    >
      <ButtonIcon icon={icon} className="text-sm tracking-wide truncate">
        {children}
      </ButtonIcon>
    </Link>
  );
};

export default CustomLink;
