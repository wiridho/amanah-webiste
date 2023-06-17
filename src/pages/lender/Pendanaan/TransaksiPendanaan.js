import React from "react";
import { useParams } from "react-router-dom";
import { lenderFunding } from "../../../service/lender/funding";

// Icon
import { BiWallet } from "react-icons/bi";
import { FormatMataUang } from "../../../utils/FormatMataUang";
import { InputLabel } from "../../../components/molekul";
import { IoWarningOutline } from "react-icons/io5";
import { Button } from "../../../components/atom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const TransaksiPendanaan = () => {
  const { loanId } = useParams();
  // Calling useForm
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { accessToken } = useSelector((state) => state.auth);
  const balance = 150000;

  const onSubmit = (data) => {
    lenderFunding({ data: { ...data, ...{ loanId } }, accessToken });
  };

  const disableButton = () => {
    let disable = true;
    let amount = getValues("amount");
    if (balance > amount || amount > 100000) {
      disable = false;
    }
    return disable;
  };

  return (
    <div className="grid grid-cols-2 sm:gap-6 lg:gap-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative justify-between rounded-xl bg-white p-4 shadow sm:p-6 lg:p-8"
      >
        <div className="flex items-center gap-3 text-gray-500">
          <BiWallet className="w-6 h-6" />
          <h3 className=" text-md ">Saldo Akun</h3>
        </div>
        <div>
          <span className="text-2xl font-semibold">
            {/* {FormatMataUang(1000000)} */}
            {FormatMataUang(balance)}
          </span>
        </div>

        <div>
          <InputLabel
            type={"number"}
            name={"amount"}
            register={{
              ...register("amount", {
                required: true,
                min: {
                  value: 100000,
                  message: "Minimal Rp100.000",
                },
                max: {
                  value: balance,
                  message: `Maksimal dengan isi saldo kamu ${balance}`,
                },
              }),
            }}
            errors={errors.amount}
            placeholder={"100.000"}
          >
            Masukkan uang yang akan anda dipinjamkan
          </InputLabel>
          <div className="flex items-center gap-2">
            <IoWarningOutline />
            <span className="text-xs">
              Minimum pemberian pinjaman Rp100.000
            </span>
          </div>
        </div>

        <div className="mt-2">
          <div>
            <span className="font-semibold">Ringkasan</span>
          </div>
          <div className="flex justify-between">
            <span>Est. Imbal hasil</span>
            <span>Rp100.000</span>
          </div>
          <div className="flex justify-between">
            <span>Est. Total dana kembali</span>
            <span>Rp100.000</span>
          </div>
        </div>

        <Button
          type={"submit"}
          className={
            "mt-4 bg-indigo-500 hover:bg-indigo-700 !rounded-full text-white w-full"
          }
        >
          Danai
        </Button>
        {/* <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
          4.3
        </span> */}
      </form>
      <div className="relative justify-between rounded-xl bg-slate-500 p-4 shadow sm:p-6 lg:p-8">
        dawdadadadaw
      </div>
    </div>
  );
};

export default TransaksiPendanaan;
