import React from "react";

//  icon
import { IoIosWarning } from "react-icons/io";
import { MdClose } from "react-icons/md";

const WarningMessage = ({ message, onClose, visible, close }) => {
  return (
    <div>
      <div
        className={`${
          visible ? "" : "hidden"
        } bg-yellow-100 border border-yellow-50 text-sm text-yellow-500   p-3 text-md  rounded-lg `}
      >
        <div className="flex items-center justify-around">
          <IoIosWarning className="h-5 w-5 mr-2" />
          <div className="flex-1  text-left">
            <span className="font-normal text-sm">{message}</span>
          </div>
          {close && (
            <button role="button" type="button" onClick={onClose}>
              {<MdClose />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarningMessage;
