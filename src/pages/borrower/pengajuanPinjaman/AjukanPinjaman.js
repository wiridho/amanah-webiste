import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { Controller, useForm } from "react-hook-form";
import { Button, Label } from "../../../components/atom";
import { opsiTenor, opsiKategori } from "../../../utils/optionValues";
import {
  InputLabel,
  RadioButton,
  SelectInput,
} from "../../../components/molekul";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBorrowersLoan } from "../../../service/Borrower/borrower";
import InputCurrency from "../../../components/molekul/InputCurrency/InputCurrency";

const AjukanPinjaman = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const { paymentSchedule, loanHistory } = useSelector(
    (state) => state.borrower
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const handleGetHistory = () => {
    dispatch(getBorrowersLoan({ accessToken }));
  };

  useEffect(() => {
    handleGetHistory();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    navigate("/borrower/konfirmasi-pinjaman", {
      state: data,
    });
  };

  return (
    <div className="h-screen flex justify-center items-center font-nunito-sans">
      <div className="w-1/2 rounded-md shadow bg-white">
        <div className="p-8">
          {loanHistory?.active?.loanId === undefined ? (
            <div>
              <span className="text-lg mb-2 text-center font-semibold">
                Ajukan Pinjaman
              </span>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div>
                    <InputCurrency
                      name={"amount"}
                      control={control}
                      placeholder={"Rp100.000"}
                      rules={{
                        required: "Nominal Pinjaman wajib diisi",
                      }}
                      errors={errors}
                    >
                      Nominal Pinjaman
                    </InputCurrency>
                  </div>
                  <div>
                    <InputCurrency
                      name={"yieldReturn"}
                      control={control}
                      placeholder={"Rp50.000"}
                      rules={{
                        required: "Imbal hasil wajib diisi",
                      }}
                      errors={errors}
                    >
                      Imbal Hasil
                    </InputCurrency>
                  </div>
                  <div>
                    <SelectInput
                      field={"Tenor"}
                      name="tenor"
                      rules={{
                        required: "Tenor wajib diisi",
                      }}
                      control={control}
                      options={opsiTenor}
                      defaultValue={opsiTenor[0]}
                      errors={errors}
                    >
                      Tenor
                    </SelectInput>
                  </div>
                  <div>
                    <SelectInput
                      rules={{
                        required: "Kategori pinjaman wajib diisi",
                      }}
                      field={"Kategori Pinjaman"}
                      name="borrowingCategory"
                      control={control}
                      options={opsiKategori}
                      defaultValue={opsiKategori[0]}
                      errors={errors}
                    >
                      Kategori Pinjaman
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
                    <InputLabel
                      type={"text"}
                      name={"Link Produk"}
                      register={{
                        ...register("productLink", {
                          required: true,
                        }),
                      }}
                      errors={errors.productLink}
                    >
                      Link Produk
                    </InputLabel>
                  </div>
                  <div className="">
                    <Label className={"!my-0 !mt-2"}>Skema Pembayaran</Label>
                    <div className="flex gap-3">
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
                  <div>
                    <Button
                      className={
                        "mt-3 bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white"
                      }
                      type="submit"
                    >
                      Ajukan Pinjaman
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            "Kamu sudah melakukan pinjaman"
          )}
        </div>
      </div>
    </div>
  );
};

export default AjukanPinjaman;
