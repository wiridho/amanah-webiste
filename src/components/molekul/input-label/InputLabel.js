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
        errors={errors}
        type={type}
        className={className}
        name={name}
        register={register}
      />
    </div>
  );
};

export default InputLabel;
