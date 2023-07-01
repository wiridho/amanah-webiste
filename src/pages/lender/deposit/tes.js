import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useForm, Controller } from "react-hook-form";

const Tes = () => {
  const { control, handleSubmit, setValue, watch } = useForm();

  const nominalOptions = ["100000", "50000"];

  const onSubmit = (data) => {
    console.log(data.amount);
  };

  const handleOptionClick = (nominal) => {
    setValue("amount", nominal);
  };

  const handleInputChange = (value) => {
    setValue("amount", value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Pilih Nominal:</label>
        <div>
          {nominalOptions.map((nominal) => (
            <button
              key={nominal}
              type="button"
              onClick={() => handleOptionClick(nominal)}
            >
              {nominal}
            </button>
          ))}
        </div>
        <Controller
          name="amount"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CurrencyInput
              placeholder="Masukkan nominal"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 focus:ring-1 outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={field.value}
              onValueChange={(value) => handleInputChange(value)}
              decimalSeparator=","
              groupSeparator="."
              prefix="Rp"
              decimalsLimit={2}
            />
          )}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
export default Tes;
