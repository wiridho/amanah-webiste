import React from "react";
import CurrencyInput from "react-currency-input-field";
import { Controller } from "react-hook-form";
import { Label } from "../../atom";

const InputCurrency = ({
  children,
  control,
  name,
  rules,
  placeholder,
  errors,
}) => {
  return (
    <div>
      <Label>{children}</Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div>
            <CurrencyInput
              placeholder={placeholder}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 focus:ring-1 outline-none focus:ring-blue-500 focus:border-blue-500"
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
              }}
              onBlur={field.onBlur}
              decimalSeparator=","
              groupSeparator="."
              prefix="Rp"
              decimalsLimit={2}
            />
            {errors?.[name]?.["type"] === "required" && (
              <span className="text-red-500 text-xs">
                {errors?.[name]?.["message"]}
              </span>
            )}
            {errors?.[name]?.["type"] === "min" && (
              <span className="text-red-500 text-xs">
                {errors?.[name]?.["message"]}
              </span>
            )}
            {errors?.[name]?.["type"] === "validasiStep" && (
              <span className="text-red-500 text-xs">
                {errors?.[name]?.["message"]}
              </span>
            )}
            {errors?.[name]?.["type"] === "validasiBalance" && (
              <span className="text-red-500 text-xs">
                {errors?.[name]?.["message"]}
              </span>
            )}
            {errors?.[name]?.["type"] === "validasiMinimum" && (
              <span className="text-red-500 text-xs">
                {errors?.[name]?.["message"]}
              </span>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default InputCurrency;
