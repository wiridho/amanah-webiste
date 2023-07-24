import React, { useState } from "react";
import { Input, Label } from "../../atom";
import { HiEye, HiEyeOff } from "react-icons/hi";

const InputPassword = ({
  children,
  register,
  errors,
  className,
  name,
  type,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Label>{children}</Label>
      <div className="relative">
        <Input
          placeholder={placeholder}
          errors={errors}
          type={showPassword ? "text" : type}
          className={className}
          name={name}
          register={register}
        />
        <div className="absolute inset-y-0 flex items-center right-0  pr-4 ">
          {type === "password" && (
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <HiEyeOff className="text-gray-800" />
              ) : (
                <HiEye className="text-gray-800" />
              )}
            </button>
          )}
        </div>
      </div>
      {errors?.type === "required" && (
        <span className="text-xs text-red-500 block">{name} wajib diisi.</span>
      )}
      {errors?.type === "pattern" && (
        <span className="text-xs text-red-500 block">
          Kata sandi harus terdiri dari 8 karakter, mengandung setidaknya satu
          huruf besar, satu huruf kecil, dan satu karakter khusus.
        </span>
      )}
      {errors?.type === "validate" && (
        <span className="text-xs text-red-500 block">{errors?.message}</span>
      )}
      <div />
    </div>
  );
};

export default InputPassword;
