import React from "react";
import InputLabel from "../../../components/molekul/inputLabel/InputLabel";
import { Controller, useForm } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import { Button } from "../../../components/atom";
import { useSelector } from "react-redux";

const Withdraw = () => {
  const { balance } = useSelector((state) => state.balance);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission with the form data
    console.log(data);
  };

  //Cat : Validasi dengan balance

  const validateStep = (value) => {
    const amount = parseFloat(value.replace(/[^\d.-]/g, "")); // Menghapus karakter non-angka dari value input
    if (amount % 50000 !== 0) {
      return "Kelipatan withdraw harus Rp50,000";
    }
    return true;
  };

  const validateBalance = (value) => {
    const amount = parseFloat(value.replace(/[^\d.-]/g, "")); // Menghapus karakter non-angka dari value input
    if (amount > balance) {
      return "Saldo tidak cukup!";
    }
    return true;
  };

  return (
    <div className="h-screen flex justify-center items-center font-nunito-sans">
      <div className="max-w-sm w-full rounded-md overflow-hidden shadow bg-white">
        <div className="p-5">
          <div className="text-lg mb-1 text-center font-semibold">
            <p>Withdraw</p>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <span>Bank</span>
                <span>BRI</span>
              </div>
              <div className="flex justify-between">
                <span>Nomor Rekening</span>
                <span>1203120312</span>
              </div>
              <div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2"
                >
                  <label>Nominal Withdraw</label>
                  <div>
                    <Controller
                      name="amount"
                      control={control}
                      rules={{
                        required: "Nominal wajib diisi",
                        min: {
                          value: 100000,
                          message: `Minimal nominal withdraw harus Rp100.000`,
                        },
                        validate: {
                          validateStep,
                          validateBalance,
                        },
                      }}
                      render={({ field }) => (
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
                    Submit
                  </Button>
                </form>
                {/* <InputLabel
                  placeholder={"Rp100.000,00"}
                  type={"number"}
                  name={"Nominal"}
                  register={{
                    ...register("amount", {
                      required: true,
                    }),
                  }}
                  errors={errors.email}
                >
                  Nominal
                </InputLabel> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
