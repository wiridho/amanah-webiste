import React from "react";

const Input = ({
  className,
  type,
  register,
  name,
  errors,
  message,
  placeholder,
}) => {
  return (
    <>
      <div className="mb-2">
        <div className="relative">
          <input
            placeholder={placeholder ? placeholder : `Masukkan ${name} anda`}
            name={name}
            {...register}
            type={type}
            className={`${className} w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 focus:ring-1 outline-none focus:ring-indigo-500 focus:border-indigo-500 `}
          />
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
