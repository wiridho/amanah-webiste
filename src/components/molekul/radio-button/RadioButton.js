import React from "react";

const RadioButton = ({ name, register, value, children }) => {
  const id = `${name}_${value}`;
  return (
    <div className="flex items-center gap-1">
      <input
        id={id}
        className={""}
        type="radio"
        name={name}
        {...register}
        value={value}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default RadioButton;
