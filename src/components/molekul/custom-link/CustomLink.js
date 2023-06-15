import React from "react";
import { Link, useLocation } from "react-router-dom";
import ButtonIcon from "../button-icon/ButtonIcon";

const CustomLink = ({ children, to, className, icon }) => {
  const { pathname } = useLocation();
  const isActive = pathname.includes(`/${to}`);
  return (
    <Link
      to={to}
      className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${className} ${
        isActive ? "bg-slate-100 font-semibold text-indigo-500" : ""
      }`}
    >
      <ButtonIcon
        icon={icon}
        className={`text-sm tracking-wide truncate ${
          isActive ? "bg-slate-100 font-semibold text-indigo-500" : ""
        } `}
      >
        {children}
      </ButtonIcon>
    </Link>
  );
};

export default CustomLink;
