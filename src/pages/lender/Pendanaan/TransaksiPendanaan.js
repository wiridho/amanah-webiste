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

  const validateSalary = (value) => {
    const numericValue = Number(value);

    if (numericValue < 100000) {
      return "Nominal minimal Rp100.000";
    }
    if (numericValue > balance) {
      return `Nominal maksimal Rp${balance}`;
    }
    if (numericValue % 50000 !== 0) {
      return "Kelipatan nominal harus Rp50.000";
    }

    return true; // Return true for valid value
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
          <div class="inline-flex justify-between bg-gray-100 rounded border border-gray-200">
            <div class="inline bg-gray-200 py-2 px-4 text-gray-600 select-none">
              Rp
            </div>
            <input
              type="number"
              {...register("nominal", {
                required: "Nominal wajib diisi",
                validate: validateSalary, // Use custom validation function
              })}
              className="bg-transparent py-1 text-gray-600 px-4 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="price"
                id="price"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>USD</option>
                  <option>CAD</option>
                  <option>EUR</option>
                </select>
              </div>
            </div>
          </div>
          {errors.nominal && (
            <span className="flex gap-2 items-center text-xs  text-red-500">
              <IoWarningOutline />
              {errors.nominal?.message}
            </span>
          )}
          {/* <InputLabel
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
                  message: `Maksimal dengan isi saldo kamu Rp.${balance}`,
                },
                validate: validateSalary,
              }),
            }}
            errors={errors.amount}
            placeholder={"100.000"}
          >
            Masukkan uang yang akan anda dipinjamkan
          </InputLabel> */}
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
    </div>
  );
};

export default TransaksiPendanaan;
