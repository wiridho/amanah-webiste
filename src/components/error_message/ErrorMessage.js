import React from "react";
import { MdClose, MdOutlineDangerous } from "react-icons/md";

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="flex p-3 text-md text-red-800 border border-red-300 rounded-lg bg-red-50">
      <div className="flex items-center">
        <div className="">
          <span className="font-bold">
            Error:
            <span className="font-normal text-sm"> {message}</span>
          </span>
        </div>
        <div>
          <button onClick={onClose}>{<MdClose className="ml-[4px]" />}</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
