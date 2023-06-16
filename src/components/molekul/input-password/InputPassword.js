import React, { useState } from "react";
import { Input, Label } from "../../atom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useForm } from "react-hook-form";

const InputPassword = ({
  children,
  register,
  errors,
  className,
  name,
  type,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  console.log(errors);

  return (
    <div>
      <Label>{children}</Label>
      <div className="relative">
        <Input
          errors={errors}
          type={showPassword ? "text" : type}
          className={className}
          name={name}
          register={register}
        />
        <div className="absolute inset-y-0 flex items-center right-0  pr-4 ">
          {type === "password" && (
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          )}
        </div>
      </div>
      {console.log(errors)}
      {errors?.type === "required" && (
        <span className="text-xs text-red-500 block">{name} is required.</span>
      )}
      {console.log(errors)}
      {errors?.type === "pattern" && (
        <span className="text-xs text-red-500 block">
          Minimal 8 karakter, 1 uppercase, 1 lowercase, dan 1 spesial karakter
        </span>
      )}
      <div />
    </div>
  );
};

export default InputPassword;
