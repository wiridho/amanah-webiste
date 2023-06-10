import React from "react";
import { Input, Label } from "../../atom";

const InputLabel = ({ type, children, className }) => {
  return (
    <div>
      <Label>{children}</Label>
      <Input type={type} className={className} />
    </div>
  );
};

export default InputLabel;
