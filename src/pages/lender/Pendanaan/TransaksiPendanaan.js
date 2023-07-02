import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postLenderFunding } from "../../../service/lender/funding";

// Icon
import { BiWallet } from "react-icons/bi";
import { FormatMataUang } from "../../../utils/FormatMataUang";
import { IoWarningOutline } from "react-icons/io5";
import { Button } from "../../../components/atom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { estimasiImbalHasil } from "../../../utils/EstimasiImbalHasil";
import { handleGetBalance } from "../../../service/balance/balance";
import CurrencyInput from "react-currency-input-field";

const TransaksiPendanaan = ({
  totalPinjaman,
  totalImbalHasil,
  sisaPendanaan,
  contract,
}) => {
  const [getInputValue, setGetInputValue] = useState("");

  const { loanId } = useParams();
  const { accessToken } = useSelector((state) => state.auth);
  const { balance } = useSelector((state) => state.balance);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Calling useForm
  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const getBalance = async () => {
    dispatch(handleGetBalance({ accessToken }));
  };

  useEffect(() => {
    getBalance();
  }, []);

  const onSubmit = (data) => {
    navigate("/funder/pendanaan/preview-kontrak", {
      state: {
        url: contract,
        backLink: `/funder/pendanaan/${loanId}`,
        data: { ...data, ...{ loanId } },
      },
    });
  };

  const validasiStep = (value) => {
    const amount = parseFloat(value.replace(/[^\d.-]/g, "")); // Menghapus karakter non-angka dari value input
    if (amount % 50000 !== 0) {
      return "Kelipatan harus Rp50,000";
    }
    return true;
  };

  const validasiBalance = (value) => {
    const amount = parseFloat(value.replace(/[^\d.-]/g, "")); // Menghapus karakter non-angka dari value input
    const saldo = parseFloat(balance);
    console.log(balance);
    if (amount > saldo) {
      return "Saldo anda tidak cukup!";
    }
    return true;
  };

  const validasiSisaPendanaan = (value) => {
    const amount = parseFloat(value.replace(/[^\d.-]/g, "")); // Menghapus karakter non-angka dari value input
    const sisaSlot = parseFloat(sisaPendanaan);
    if (amount > sisaSlot) {
      const result = `Pendanaan tidak boleh melebihi sisa slot saat ini! Maksimal ${sisaSlot}`;
      return result;
    }
    return true;
  };

  // const disableButton = () => {
  //   let disable = true;
  //   let amount = getValues("amount");
  //   if (balance > amount || amount > 100000) {
  //     disable = false;
  //   }
  //   return disable;
  // };

  let estImbalHasil = estimasiImbalHasil({
    totalPinjaman,
    totalImbalHasil,
    getInputValue,
  });

  return (
    <div>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-3 text-gray-500">
            <BiWallet className="w-6 h-6" />
            <h3 className=" text-md ">Saldo Akun</h3>
          </div>
          <div>
            <span className="text-2xl font-semibold">
              {FormatMataUang(balance)}
            </span>
          </div>

          <div>
            <div>
              <div className="relative mt-2 rounded-md shadow-sm">
                <Controller
                  name="amount"
                  control={control}
                  rules={{
                    required: "Nominal wajib diisi!",
                    min: {
                      value: 100000,
                      message: `Minimal Pendanaan Rp100.000`,
                    },
                    validate: {
                      validasiStep,
                      validasiBalance,
                      validasiSisaPendanaan,
                    },
                  }}
                  render={({ field }) => (
                    <div>
                      <CurrencyInput
                        placeholder="Rp100.000"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 focus:ring-1 outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={field.value}
                        onValueChange={(value) => {
                          setGetInputValue(value);
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
              </div>
              {errors.amount && (
                <span className="text-red-500 text-xs">
                  {errors.amount.message}
                </span>
              )}
            </div>
            {errors.nominal && (
              <span className="flex gap-2 items-center text-xs  text-red-500">
                <IoWarningOutline />
                {errors.nominal?.message}
              </span>
            )}
          </div>

          <div className="mt-2">
            <div>
              <span className="font-semibold">Ringkasan</span>
            </div>
            <div className="flex justify-between">
              <span>Estimasi Imbal hasil</span>
              <span>{FormatMataUang(estImbalHasil)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimasi total dana kembali</span>
              <span>
                {FormatMataUang(
                  parseInt(getInputValue) + parseInt(estImbalHasil)
                )}
              </span>
            </div>
          </div>

          <Button
            className={
              "mt-5 bg-indigo-500 hover:bg-indigo-700 !rounded-full text-white w-full"
            }
          >
            Danai
          </Button>
          {/* <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
          4.3
        </span> */}
        </form>
      </div>
    </div>
  );
};

export default TransaksiPendanaan;
