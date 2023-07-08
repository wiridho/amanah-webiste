import React, { useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { Label } from "../../atom";

const SelectInput = ({ children, name, options, control, errors, field }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  return (
    <div>
      <Label>{children}</Label>
      <Controller
        name={name}
        rules={{
          required: {
            value: true,
            message: `${field} wajib diisi!`,
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Select
              {...field}
              options={options}
              value={selectedValue?.find((c) => c?.value === value)}
              onChange={(val) => onChange(val?.value)}
            />
          </>
        )}
      />

      {errors?.["type"] === "required" && (
        <span className="text-red-500 text-xs">{errors?.message}</span>
      )}
    </div>
  );
};

export default SelectInput;
