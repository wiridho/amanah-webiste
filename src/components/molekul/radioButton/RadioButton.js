import React from "react";
import { Input, Label } from "../../atom";

const RadioButton = ({ name, register, value, children, errors }) => {
  const id = `${name}_${value}`;
  return (
    <div className="">
      <div className="">
        <div className="flex gap-2">
          <input
            id={id}
            className={""}
            type="radio"
            name={name}
            {...register}
            value={value}
          />
          <Label htmlFor={id}>{children}</Label>
        </div>
      </div>
      {errors?.type === "required" && (
        <span className="text-xs text-red-500 block">{name} wajib diisi!.</span>
      )}
    </div>
  );
};

export default RadioButton;
