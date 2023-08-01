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
import LoanImg from "../../../assets/img/loan/loan.png";

import { Link } from "react-router-dom";
import { getProfileBorrower } from "../../../service/Borrower/profile";

const AjukanPinjaman = () => {
  const { accessToken, statusKYC } = useSelector((state) => state.auth);
  const { paymentSchedule, loanHistory, profile } = useSelector(
    (state) => state.borrower
  );
  const { loanLimit } = profile;
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
  const getProfile = () => {
    dispatch(getProfileBorrower({ accessToken }));
  };

  useEffect(() => {
    handleGetHistory();
    getProfile();
  }, [statusKYC]);

  const onSubmit = (data) => {
    navigate("/borrower/konfirmasi-pinjaman", {
      state: data,
    });
  };

  const validasiLimit = (value) => {
    const amount = parseFloat(value.replace(/[^\d.-]/g, ""));
    console.log(amount);
    if (amount > loanLimit) {
      console.log("masuk");
      return "Peminjaman tidak boleh melebihi limit pinjaman!";
    }
    return true;
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
              <div className="flex flex-col mb-5 ">
                <span className="text-xl mb-3 text-center font-semibold">
                  Pengajuan Pinjaman
                </span>
                <span className="text-gray-500 text-sm">
                  Mohon mengisi lengkap formulir pegajuan pinjaman ini dibawah
                  untuk mengajukan pinjaman
                </span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-6 gap-2">
                  <div className="col-span-6">
                    <InputCurrency
                      name={"amount"}
                      control={control}
                      placeholder={"Rp100.000"}
                      rules={{
                        required: "Nominal Pinjaman wajib diisi",
                        validate: { validasiLimit },
                      }}
                      errors={errors}
                    >
                      Nominal Pinjaman
                    </InputCurrency>
                  </div>
                  <div className="col-span-6">
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
                  <div className="col-span-6">
                    <SelectInput
                      field={"Tenor"}
                      placeholder={"Pilih..."}
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
                  <div className="col-span-6 grid grid-cols-6 gap-3 items-center">
                    <div className="col-span-3">
                      <SelectInput
                        placeholder="Pilih..."
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
                    <div className="col-span-3">
                      <InputLabel
                        type={"text"}
                        placeholder={"Tujuan pinjaman anda"}
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
                  </div>
                  <div className="col-span-6">
                    <InputLabel
                      type={"text"}
                      placeholder={"Link produk anda"}
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
                  <div className="col-span-6">
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
                  <div className="col-span-6">
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
            <div className="min-h-[15rem] flex flex-col bg-white  rounded-xl">
              <div className="flex flex-auto flex-col justify-center items-center">
                <img src={LoanImg} style={{ width: 150 }} alt="" />
                <h3 className="text-lg font-bold my-4">
                  Pinjaman anda sedang berlangsung
                </h3>
                <p className="mt-2 text-gray-600 text-justify">
                  Silahkan menunggu beberapa saat sampai dengan pihak lender
                  mendanai pinjaman anda. Lakukan pengecekan secara berkala pada
                  aplikasi Amanah, untuk mengetahui pinjaman anda
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AjukanPinjaman;
