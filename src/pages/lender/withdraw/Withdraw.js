import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import { Button, Label } from "../../../components/atom";
import WithdrawImg from "../../../assets/img/withdraw/withdraw.png";

import {
  handleGetBalance,
  postBalanceWithdraw,
} from "../../../service/balance/balance";
import { TruncateString } from "../../../utils/Truncate";

const Withdraw = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const { balance } = useSelector((state) => state.balance);
  const { bankSelected } = useSelector((state) => state.balance_transaction);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const getBalance = () => {
    dispatch(handleGetBalance({ accessToken }));
  };

  useEffect(() => {
    getBalance();
  }, []);

  const onSubmit = (data) => {
    data["bankCode"] = bankSelected.bankCode;
    data["accountNumber"] = bankSelected.accountNumber;
    dispatch(postBalanceWithdraw({ data, accessToken, navigate }));
  };

  const validasiBalance = (value) => {
    const amount = parseFloat(value.replace(/[^\d.-]/g, ""));
    if (amount > balance) {
      return "Saldo anda tidak cukup!";
    }
    return true;
  };

  return (
    <div className="h-screen flex justify-center items-center font-nunito-sans">
      <div className="w-2/5 rounded-md overflow-hidden shadow bg-white">
        <div className="p-5 flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <p className="text-xl text-center font-semibold">Withdraw</p>
            <div className="h-52 overflow-hidden flex flex-col justify-center items-center  rounded-t-xl">
              <img
                src={WithdrawImg}
                alt=""
                className="flex justify-center items-center"
                style={{ height: "200px" }}
              />
            </div>
            <span className="text-gray-500 text-sm ">
              Isi nominal dan klik tombol Withdraw untuk melakukan penarikan
              saldo.
            </span>
          </div>

          <div className="">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-[#194175]">Bank</span>
                  <span className="font-bold text-[#194175]">
                    {TruncateString(bankSelected?.bankName, 28)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className=" text-[#194175]">Nomor Rekening</span>
                  <span className="font-bold text-[#194175]">
                    {bankSelected?.accountNumber}
                  </span>
                </div>
              </div>
              <div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  <div>
                    <Label className={"p-0 my-1 text-xs"}>Nominal</Label>
                    <Controller
                      name="amount"
                      control={control}
                      rules={{
                        required: "Nominal wajib diisi!",
                        min: {
                          value: 100000,
                          message: `Minimal nominal withdraw Rp100.000`,
                        },
                        validate: {
                          validasiBalance,
                        },
                      }}
                      render={({ field }) => (
                        <div>
                          <CurrencyInput
                            placeholder="Minimal Rp100.000"
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
                        </div>
                      )}
                    />
                    {errors.amount && (
                      <span className="text-red-500 text-xs">
                        {errors.amount.message}
                      </span>
                    )}
                  </div>
                  <Button
                    className={
                      "bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white"
                    }
                    type="submit"
                  >
                    Withdraw
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
