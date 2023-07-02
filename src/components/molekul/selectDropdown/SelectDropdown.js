import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Label } from "../../atom";

const SelectDropdown = ({ data, name, control, errors }) => {
  const options = data.map((item) => ({
    value: item.bank_code,
    label: item.name,
  }));

  return (
    <div>
      <Label className="block text-sm font-medium text-gray-900">
        Pilih akun bank
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: "Nominal wajib diisi!",
        }}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder="Choose an option"
            isClearable
          />
        )}
      />
      {errors?.name && (
        <span className="text-red-500 text-xs">{errors?.name?.message}</span>
      )}
    </div>
  );
};

export default SelectDropdown;
