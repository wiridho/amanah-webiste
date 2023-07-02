import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import { Button, Label } from "../../../components/atom";
import {
  handleGetBalance,
  postBalanceWithdraw,
} from "../../../service/balance/balance";

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
      <div className="max-w-sm w-full rounded-md overflow-hidden shadow bg-white">
        <div className="p-5">
          <div className="text-xl mb-4 text-center font-semibold">
            <p>Withdraw</p>
          </div>

          <div className="">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank</span>
                  <span className="font-semibold">
                    {bankSelected?.bankName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nomor Rekening</span>
                  <span className="font-semibold">
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
                  <Button
                    className={"bg-indigo-500 px-4 py-2 text-white"}
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
