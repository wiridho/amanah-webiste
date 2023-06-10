import React from "react";
import { MdClose, MdOutlineDangerous } from "react-icons/md";

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="flex p-3 text-md text-red-800 border border-red-300 rounded-lg bg-red-50">
      <div className="flex items-center">
        <div className="">
          <span class="font-bold">
            <MdOutlineDangerous className="inline text-xl mb-[1px] mr-1" />{" "}
            Error:
            <span className="font-normal"> {message}</span>
          </span>
        </div>
        <div>
          <button onClick={onClose}>{<MdClose className="w-5 h-5" />}</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
