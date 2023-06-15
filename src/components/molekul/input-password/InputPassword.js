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
  message,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="">
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
    </div>
  );
};

export default InputPassword;
