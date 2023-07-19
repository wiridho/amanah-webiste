import React, { useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { Label } from "../../atom";

const SelectBank = ({ data, name, control, errors, children, field }) => {
  const dataBank =
    data &&
    data.map((item) => ({
      value: item.bank_code,
      label: item.name,
    }));

  return (
    <div>
      <Label>{children}</Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: `${field} wajib diisi!`,
        }}
        render={({ field }) => (
          <Select
            {...field}
            options={dataBank}
            placeholder="Silahkan pilih bank"
            isClearable
          />
        )}
      />

      {errors?.["type"] === "required" && (
        <span className="text-red-500 text-xs">{errors?.message}</span>
      )}
    </div>
  );
};

export default SelectBank;
