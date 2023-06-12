import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Input = ({
  className,
  type,
  register,
  name,
  errors,
  message,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="mb-2">
        <div className="relative">
          <input
            placeholder={placeholder ? placeholder : `Masukkan ${name} anda`}
            name={name}
            {...register}
            type={showPassword ? "text" : type}
            className={`${className} w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 focus:ring-1 outline-none focus:ring-indigo-500 focus:border-indigo-500 `}
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
    </>
  );
};

export default Input;
