import React from "react";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { IoIosWarning } from "react-icons/io";
import { MdClose } from "react-icons/md";

const Message = ({ status, message, onClose, visible }) => {
  return (
    <div>
      <div
        className={`${visible ? "" : "hidden"} ${
          status
            ? " text-green-800  border-green-300 bg-green-50"
            : "text-red-800 border-red-300 bg-red-50"
        }  border p-3 text-md  rounded-lg `}
      >
        <div className="flex items-center justify-around">
          {status ? (
            <HiOutlineCheckCircle className="h-5 w-5 mr-2" />
          ) : (
            <IoIosWarning className="h-5 w-5 mr-2" />
          )}

          <div className="flex-1  text-left">
            <span className="font-normal text-sm">{message}</span>
          </div>
          <button role="button" onClick={onClose}>
            {<MdClose />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
