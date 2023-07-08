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
}) => {
  return (
    <div>
      <Label>{children}</Label>
      <Input
        placeholder={placeholder}
        type={type}
        className={className}
        name={name}
        register={register}
      />
      {errors?.type === "required" && (
        <span className="text-xs text-red-500 block">{name} wajib diisi.</span>
      )}
      {errors?.type === "validate" && (
        <span className="text-xs text-red-500 block">
          Wajib kelipatan Rp.50000
        </span>
      )}
      {(errors?.type === "max" || errors?.type === "min") && (
        <span className="text-xs text-red-500 block">{errors.message}</span>
      )}
    </div>
  );
};

export default InputLabel;
