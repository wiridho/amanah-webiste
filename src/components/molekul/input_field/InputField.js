import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { titleCase } from "../../../utils/FormatTitleCase";
import { Label } from "../../atom";

const InputField = ({ type, name, errors, register, message, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Label className="block mb-2 text-sm font-medium text-gray-600">
        {label}
      </Label>
      <div className="mb-2">
        <div className="relative">
          <input
            // placeholder={placeholder ? placeholder : `Masukkan ${name} anda`}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none
          focus:ring-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            type={showPassword ? "text" : type}
            name={name}
            {...register}
          />
          <div className="absolute inset-y-0 right-0 flex  pr-4 ">
            {type === "password" && (
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            )}
          </div>
        </div>

        {errors?.type === "required" && (
          <span className="text-xs text-red-500 block">
            {name} is required.
          </span>
        )}
        {errors?.type === "pattern" && (
          <span className="text-xs text-red-500 block">{message}</span>
        )}
      </div>
    </div>
  );
};

export default InputField;
InputField.defaultProps = {
  type: "text",
  name: "",
};
