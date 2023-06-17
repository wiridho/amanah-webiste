import React from "react";
import { Input, Label } from "../../atom";

const InputLabel = ({
  type,
  children,
  className,
  name,
  register,
  errors,
  placeholder,
  max,
  min,
}) => {
  return (
    <div>
      <Label>{children}</Label>
      <Input
        placeholder={placeholder}
        errors={errors}
        type={type}
        className={className}
        name={name}
        register={register}
      />

      {errors?.type === "required" && (
        <span className="text-xs text-red-500 block">{name} is required.</span>
      )}
      {(errors?.type === "max" || errors?.type === "min") && (
        <span className="text-xs text-red-500 block">{errors.message}</span>
      )}
    </div>
  );
};

export default InputLabel;
