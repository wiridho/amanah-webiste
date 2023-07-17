import React from "react";

const Input = ({
  className,
  type,
  register,
  name,
  placeholder,
  defaultValue,
}) => {
  return (
    <>
      <div>
        <input
          placeholder={placeholder ? placeholder : `Masukkan ${name} anda`}
          name={name}
          defaultValue={defaultValue}
          {...register}
          type={type}
          className={`${className} w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 focus:ring-1 outline-none focus:ring-indigo-500 focus:border-indigo-500 `}
        />
      </div>
    </>
  );
};

export default Input;
