import React from "react";

import { useForm } from "react-hook-form";
import { InputLabel } from "../../components/molekul";
import { Button } from "../../components/atom";
import { useDispatch, useSelector } from "react-redux";
import { postBalanceDeposit } from "../../service/balance/balance";
import { useState } from "react";

const Deposit = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { paymentLink, message } = useSelector((state) => state.balance);
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle Submit
  const onSubmit = (data) => {
    console.log(data);
    dispatch(postBalanceDeposit({ accessToken, data, setPaymentStatus }));
  };

  return (
    <div className="flex justify-center items-center  h-screen">
      {message && <span>{message}</span>}
      {paymentStatus === "waitingPayment" ? (
        <div>
          <span>Silahkan klik link untuk </span>
          <a href={paymentLink} rel="noreferrer" target="_blank">
            Lanjutkan Pembayaran
          </a>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-md shadow "
        >
          <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 text-center">
            Input Nominal
          </h5>
          <InputLabel
            placeholder={"Rp100.000"}
            type={"number"}
            name={"Nominal"}
            register={{
              ...register("amount", {
                required: true,
              }),
            }}
            errors={errors.amount}
          >
            Input Nominal
          </InputLabel>
          <br />
          <Button
            type={"submit"}
            className={"bg-indigo-500 rounded px-4 py-2 text-white"}
          >
            Top up sekarang
          </Button>
        </form>
      )}
    </div>
  );
};

export default Deposit;
