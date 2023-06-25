import React from "react";
import { TbAlertTriangle } from "react-icons/tb";

const WarningMessage = () => {
  return (
    <div>
      <div className="p-4 max-w-4xl flex rounded-lg border border-yellow-300 bg-yellow-100">
        <span className="flex-shrink-0 text-yellow-500">
          <TbAlertTriangle className="w-6 h-6" />
        </span>
        <div className="ml-3 flex flex-col items-start space-y-2 text-sm">
          <h3 className="text-yellow-800 font-semibold">Warning!</h3>
          <p className="text-yellow-600 font-medium antialiased">
            Better check this by yourself, it is not looking too good.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarningMessage;
