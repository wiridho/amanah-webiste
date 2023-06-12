import React from "react";
import { Input, Label } from "../../atom";

const InputLabel = ({ type, children, className, name, register, errors }) => {
  return (
    <div>
      <Label>{children}</Label>
      <Input
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
