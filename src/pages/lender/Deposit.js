import React from "react";

import { Controller, useForm } from "react-hook-form";
import { InputLabel } from "../../components/molekul";
import { Button, Label } from "../../components/atom";
import { useDispatch, useSelector } from "react-redux";
import { postBalanceDeposit } from "../../service/balance/balance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import StatusKYC from "../../components/molekul/statusKYC/StatusKYC";

const Deposit = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { paymentLink } = useSelector((state) => state.balance_transaction);

  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const nominalOptions = [
    "300.000",
    "250.000",
    "200.000",
    "150.000",
    "100.000",
    "50.000",
  ];

  // Handle Submit
  const onSubmit = (data) => {
    data["isWebsite"] = true;
    dispatch(postBalanceDeposit({ accessToken, data, setPaymentStatus }));
  };

  const handleInputChange = (value) => {
    setValue("amount", value);
  };

  const handleOptionClick = (nominal) => {
    setValue("amount", nominal);
  };

  return (
    <div className="flex justify-center items-center  h-screen">
      <StatusKYC
        component={
          paymentStatus === "waitingPayment" ? (
            <div>
              <span>Silahkan klik link untuk </span>
              <a
                href={paymentLink}
                rel="noreferrer"
                className="underline"
                target="_blank"
              >
                Lanjutkan Pembayaran
              </a>
            </div>
          ) : (
            <div className="max-w-sm w-full p-6 rounded-lg bg-white border border-gray-200 shadow">
              <div className="text-xl text-center font-semibold">
                <p>Deposit</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-9">
                  <div>
                    <Label className={"p-0 my-1 text-xs"}>Nominal</Label>
                    <Controller
                      name="amount"
                      control={control}
                      rules={{
                        required: "Nominal wajib diisi!",
                      }}
                      defaultValue=""
                      render={({ field }) => (
                        <CurrencyInput
                          placeholder="Masukkan nominal"
                          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 focus:ring-1 outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={field.value}
                          onValueChange={(value) => handleInputChange(value)}
                          decimalSeparator=","
                          groupSeparator="."
                          prefix="Rp"
                          decimalsLimit={2}
                        />
                      )}
                    />
                    <div>
                      {errors.amount && (
                        <span className="text-red-500 text-xs">
                          {errors.amount.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {nominalOptions.map((nominal) => {
                      const value = Number(nominal.replace(/[.,]/g, ""));
                      return (
                        <span
                          type="button"
                          key={nominal}
                          className=" px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300"
                          onClick={() => handleOptionClick(value)}
                        >
                          Rp{nominal}
                        </span>
                      );
                    })}
                  </div>
                  <div>
                    <Button
                      type={"submit"}
                      className={"w-full bg-indigo-500  px-4 py-2 text-white"}
                    >
                      Deposit Sekarang
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )
        }
      />
    </div>
  );
};

export default Deposit;
