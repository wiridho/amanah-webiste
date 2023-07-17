import React, { useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { Label } from "../../atom";

const SelectInput = ({ children, name, options, control, errors, rules }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  return (
    <div>
      <Label>{children}</Label>
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field }) => (
          <>
            <Select
              {...field}
              options={options}
              value={selectedValue?.find((c) => c?.value === field?.value)}
              onChange={(val) => field?.onChange(val?.value)}
            />
          </>
        )}
      />
      {errors?.[name]?.["type"] === "required" && (
        <span className="text-red-500 text-xs">
          {errors?.[name]?.["message"]}
        </span>
      )}
    </div>
  );
};

export default SelectInput;
