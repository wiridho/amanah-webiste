import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { InputLabel } from "../../../components/molekul";
import { Button } from "../../../components/atom";

const WithdrawTambahBank = () => {
  const { accessToken } = useSelector((state) => state.auth);

  // Calling useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div className="h-screen flex justify-center items-center font-nunito-sans">
      <div className="max-w-sm w-full rounded-md overflow-hidden shadow bg-white">
        <div className="p-5">
          <div className="text-lg mb-1 text-center font-semibold">
            Tambah Akun Bank
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col  gap-2 justify-center">
              <div>
                <InputLabel
                  placeholder={"1930xxxxx"}
                  nama={"Nomor Rekening"}
                  type={"number"}
                >
                  Nomor Rekening
                </InputLabel>
              </div>

              <Button
                className={`bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-xs`}
                type={"submit"}
              >
                Cek Rekening Bank
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawTambahBank;
