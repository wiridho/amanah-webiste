import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

const SelectDropdown = ({ data, name, control }) => {
  const options = data.map((item) => ({
    value: item.bank_code,
    label: item.name,
  }));

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Pilih akun bank
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder="Choose an option"
            isClearable
          />
        )}
      />
    </div>
  );
};

export default SelectDropdown;
