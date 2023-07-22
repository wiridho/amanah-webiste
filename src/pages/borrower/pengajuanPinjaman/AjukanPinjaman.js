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
import WarnigGif from "../../../assets/img/success/warning2.gif";
import UserImg from "../../../assets/img/user/user.png";

import { Link } from "react-router-dom";

const AjukanPinjaman = () => {
  const { accessToken, statusKYC } = useSelector((state) => state.auth);
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
  }, [statusKYC]);

  const onSubmit = (data) => {
    console.log(data);
    navigate("/borrower/konfirmasi-pinjaman", {
      state: data,
    });
  };

  if (statusKYC === "not verified") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="group flex flex-col w-full sm:w-2/6  bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="h-52 flex flex-col justify-center items-center  rounded-t-xl relative">
            <img
              src={UserImg}
              alt=""
              className="p-2 overflow-hidden object-cover"
            />
          </div>
          <div className="p-4 md:px-6 md:py-4">
            <span className="block mb-1 text-xs font-semibold uppercase text-blue-600"></span>
            <h3 className="text-xl font-semibold text-gray-800">
              Status KYC belum diverfikasi
            </h3>
            <p className="mt-3 text-gray-500">
              Akun anda belum verifikasi KYC Kami sangat menyarankan Anda untuk
              segera melakukan
              <span className="font-semibold"> verifikasi KYC.</span> Dengan
              verifikasi KYC yang lengkap, Anda akan memperoleh akses penuh
              untuk melakukan transaksi di platform kami.
            </p>
          </div>
          <div className="mt-auto flex border-t border-gray-200 px-4 md:px-6 py-3 ">
            <Link
              to={"/borrower"}
              className="text-blue-500 hover:text-blue-700"
            >
              Kembali ke halaman utama{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (statusKYC === "pending") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="group flex flex-col w-full sm:w-2/6  bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="h-52 flex flex-col justify-center items-center bg-yellow-100  rounded-t-xl relative">
            <img
              src={WarnigGif}
              alt=""
              className="w-1/2 overflow-hidden object-cover"
            />
          </div>
          <div className="p-4 md:px-6 md:py-4">
            <span className="block mb-1 text-xs font-semibold uppercase text-blue-600"></span>
            <h3 className="text-xl font-semibold text-gray-800">
              Status KYC sedang diproses
            </h3>
            <p className="mt-3 text-gray-500">
              Proses verifikasi KYC Anda{" "}
              <span className="font-semibold"> sedang diproses</span> Mohon
              ditunggu hingga status KYC Anda disetujui oleh admin, Terima kasih
              atas kesabaran Anda.
            </p>
          </div>
          <div className="mt-auto flex border-t border-gray-200 px-4 md:px-6 py-3 ">
            <Link
              to={"/borrower"}
              className="text-blue-500 hover:text-blue-700"
            >
              Kembali ke halaman utama{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                        "w-full mt-3 bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white"
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
