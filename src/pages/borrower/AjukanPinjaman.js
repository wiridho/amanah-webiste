import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { Controller, useForm } from "react-hook-form";
import { Button, Label } from "../../components/atom";
import { InputLabel, RadioButton, SelectInput } from "../../components/molekul";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AjukanPinjaman = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const opsiKategori = [
    { value: "Pendidikan", label: "Pendidikan" },
    { value: "Hiburan", label: "Hiburan" },
    { value: "Pribadi", label: "Pribadi" },
    { value: "Usaha", label: "Usaha" },
    { value: "other", label: "other" },
  ];

  const opsiTenor = [
    { value: "1", label: "1 Bulan" },
    { value: "2", label: "2 Bulan" },
    { value: "3", label: "3 Bulan" },
    { value: "4", label: "4 Bulan" },
    { value: "5", label: "5 Bulan" },
    { value: "6", label: "6 Bulan" },
    { value: "7", label: "7 Bulan" },
    { value: "8", label: "8 Bulan" },
    { value: "9", label: "9 Bulan" },
    { value: "10", label: "10 Bulan" },
    { value: "11", label: "11 Bulan" },
    { value: "12", label: "12 Bulan" },
  ];

  const validasiStep = (value) => {
    const amount = parseFloat(value.replace(/[^\d.-]/g, "")); // Menghapus karakter non-angka dari value input
    if (amount % 50000 !== 0) {
      return "Kelipatan nominal harus Rp50.000!";
    }
    return true;
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
                      value: 500000,
                      message: `Minimal nominal pinjaman Rp500.000`,
                    },
                    validate: { validasiStep },
                  }}
                  render={({ field }) => (
                    <div>
                      <CurrencyInput
                        placeholder="Rp500.000"
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
                      value: 50000,
                      message: `Minimal imbal hasil pinjaman Rp50.000`,
                    },
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
                  <SelectInput
                    field={"Hubungan kerabat"}
                    name="borrowringCategory"
                    control={control}
                    options={opsiKategori}
                    defaultValue={opsiKategori[0]}
                    errors={errors?.["borrowringCategory"]}
                  >
                    Kategori Pinjaman
                  </SelectInput>
                </div>
                <div>
                  <SelectInput
                    field={"Tenor"}
                    name="tenor"
                    control={control}
                    options={opsiTenor}
                    defaultValue={opsiTenor[0]}
                    errors={errors?.["tenor"]}
                  >
                    Tenor
                  </SelectInput>
                </div>
                <div>
                  <InputLabel
                    type={"text"}
                    name={"Tujuan Peminjaman"}
                    register={{
                      ...register("purpose", {
                        required: true,
                      }),
                    }}
                    errors={errors.purpose}
                  >
                    Tujuan Peminjaman
                  </InputLabel>
                </div>
                <div>
                  <div className="">
                    <Label>Jenis Kelamin</Label>
                    <div className="flex">
                      <div>
                        <RadioButton
                          name="Skema Pembayaran"
                          register={{
                            ...register("paymentSchema", {
                              required: true,
                            }),
                          }}
                          value={"Pelunasan Langsung"}
                          errors={errors.paymentSchema}
                        >
                          Pelunasan Langsung
                        </RadioButton>
                      </div>
                      <div>
                        <RadioButton
                          name=""
                          register={{
                            ...register("paymentSchema", {
                              required: true,
                            }),
                          }}
                          value={"Pelunasan Cicilan"}
                        >
                          Pelunasan Cicilan
                        </RadioButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  className={"mt-3 bg-indigo-500 px-4 py-2 text-white"}
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
