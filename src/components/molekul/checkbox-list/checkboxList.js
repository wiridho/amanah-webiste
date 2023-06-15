import React from "react";

const CheckboxList = ({ label, value, name, register }) => {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" {...register} value={value} />
      <label>{label}</label>
    </div>
  );
};

export default CheckboxList;
