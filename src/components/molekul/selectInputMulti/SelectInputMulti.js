import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { Label } from "../../atom";
import _ from "lodash";

const SelectInputMulti = ({
  children,
  name,
  options,
  control,
  errors,
  rules,
}) => {
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
              isMulti
              {...field}
              options={options}
              onChange={(val) => field?.onChange(val)}
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

export default SelectInputMulti;
