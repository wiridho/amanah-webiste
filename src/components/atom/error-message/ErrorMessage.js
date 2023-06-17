import React from "react";
import { IoIosWarning } from "react-icons/io";
import { MdClose } from "react-icons/md";

const ErrorMessage = ({ message, onClose }) => {
  console.log("atom");
  return (
    <>
      <div className="p-3 text-md text-red-800 border border-red-300 rounded-lg bg-red-50">
        <div className="flex items-center justify-around">
          <IoIosWarning className="h-5 w-5 mr-2" />
          <div className="flex-1  text-left">
            <span className="font-normal text-sm"> {message}</span>
          </div>
          <button onClick={onClose}>{<MdClose className="" />}</button>
        </div>
      </div>
    </>
  );
};

export default ErrorMessage;
