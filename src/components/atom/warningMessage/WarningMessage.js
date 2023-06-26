import React from "react";

//  icon
import { IoIosWarning } from "react-icons/io";
import { MdClose } from "react-icons/md";

const WarningMessage = ({ message, onClose, visible }) => {
  return (
    <div className={`${visible ? "" : "hidden"} block w-full`}>
      <div className="flex bg-yellow-50 mx-2 p-4 rounded justify-between text-bold text-yellow-700 items-center border border-yellow-300 ">
        <div className="flex space-x-4 items-center">
          <IoIosWarning className="h-5 w-5 flex-none" />
          <span className="whitespace-normal">{message}</span>
        </div>
        <div className="flex space-x-1 items-center">
          <button role="button" onClick={onClose}>
            {<MdClose className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningMessage;
