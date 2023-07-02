import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { Controller, useForm } from "react-hook-form";
import { Button, Label } from "../../components/atom";

const AjukanPinjaman = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="h-screen flex justify-center items-center font-nunito-sans">
      <div className="w-full rounded-md shadow bg-white">
        <div className="p-5">
          <span className="text-lg mb-2 text-center font-semibold">
            Ajukan Pinjaman
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <Label>Nominal</Label>
                <Controller
                  name="amount"
                  control={control}
                  rules={{
                    required: "Nominal wajib diisi!",
                    min: {
                      value: 100000,
                      message: `Minimal nominal pinjaman Rp100.000`,
                    },
                    validate: {},
                  }}
                  render={({ field }) => (
                    <div>
                      <CurrencyInput
                        placeholder="Rp100.000"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 focus:ring-1 outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                    </div>
                  )}
                />
                {errors.amount && (
                  <span className="text-red-500 text-xs">
                    {errors.amount.message}
                  </span>
                )}
              </div>
              <div>
                <Label>Imbal Hasil</Label>
                <Controller
                  name="yieldReturn"
                  control={control}
                  rules={{
                    required: "Imbal hasil wajib diisi!",
                    min: {
                      value: 100000,
                      message: `Minimal nominal pinjaman Rp100.000`,
                    },
                    validate: {},
                  }}
                  render={({ field }) => (
                    <div>
                      <CurrencyInput
                        placeholder="Rp50.000"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 focus:ring-1 outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                    </div>
                  )}
                />
                {errors.yieldReturn && (
                  <span className="text-red-500 text-xs">
                    {errors.yieldReturn.message}
                  </span>
                )}
              </div>
              <div>
                <div>
                  <label
                    htmlFor="HeadlineAct"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Headliner
                  </label>

                  <select
                    name="HeadlineAct"
                    id="HeadlineAct"
                    className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                  >
                    <option value="">Please select</option>
                    <option value="JM">John Mayer</option>
                    <option value="SRV">Stevie Ray Vaughn</option>
                    <option value="JH">Jimi Hendrix</option>
                    <option value="BBK">B.B King</option>
                    <option value="AK">Albert King</option>
                    <option value="BG">Buddy Guy</option>
                    <option value="EC">Eric Clapton</option>
                  </select>
                </div>
              </div>
              <div>
                <Button
                  className={"bg-indigo-500 px-4 py-2 text-white"}
                  type="submit"
                >
                  Ajukan Pinjaman
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjukanPinjaman;
