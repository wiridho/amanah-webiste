import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Label } from "../../components/atom";
import { useDispatch, useSelector } from "react-redux";
import { postBalanceDeposit } from "../../service/balance/balance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import StatusKYC from "../../components/molekul/statusKYC/StatusKYC";
import DepositImg from "../../assets/img/deposit/deposit.png";
import { HiOutlineChevronRight } from "react-icons/hi";

const Deposit = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { paymentLink } = useSelector((state) => state.balance_transaction);
  const [selectedNominal, setSelectedNominal] = useState(null);

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
    "1.000.000",
    "800.000",
    "750.000",
    "500.000",
    "300.000",
    "250.000",
    "150.000",
    "100.000",
  ];

  // Handle Submit
  const onSubmit = (data) => {
    data["isWebsite"] = true;
    dispatch(
      postBalanceDeposit({
        accessToken,
        data,
        setPaymentStatus,
        navigate: () => "/funder/riwayat-transaksi",
      })
    );
  };

  const handleInputChange = (value) => {
    setValue("amount", value);
  };

  const handleOptionClickNominal = (value) => {
    setValue("amount", value);
    setSelectedNominal(value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <StatusKYC
        component={
          paymentStatus === "waitingPayment" ? (
            <div className="group w-full sm:w-2/6 flex flex-col  bg-white border border-gray-200 shadow-sm rounded-xl ">
              <div className="h-52 overflow-hidden flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
                <img
                  src={DepositImg}
                  alt=""
                  className="mt-[-6px]"
                  style={{ height: "300px" }}
                />
              </div>
              <div className="p-4 md:p-6">
                <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 "></span>
                <h3 className="text-xl font-semibold text-gray-800">
                  Deposit Dana
                </h3>
                <p className="my-4 text-gray-500">
                  Klik tombol di bawah untuk melakukan deposit. Anda akan
                  diarahkan ke halaman pihak ketiga untuk menyelesaikan proses
                  pembayaran. Dana di Aplikasi Amanah akan bertambah setelah
                  pembayaran selesai.
                </p>
                <a
                  className="flex justify-center  bg-blue-100 text-blue-400 hover:bg-blue-200 px-5 py-2.5 hover:text-blue-500  w-full rounded-md "
                  href={paymentLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="flex items-center justify-center gap-1  text-sm font-medium">
                    Lanjutkan Pembayaran
                    <HiOutlineChevronRight />
                  </span>
                </a>
              </div>
            </div>
          ) : (
            <div className="w-full sm:w-2/6 p-6 rounded-lg bg-white border border-gray-200 shadow">
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
                          placeholder="Minimal Rp500.000"
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
                  <div className="grid grid-cols-3 gap-4">
                    {nominalOptions.map((nominal) => {
                      const value = Number(nominal.replace(/[.,]/g, ""));
                      const isSelected = selectedNominal === value;
                      return (
                        <div className="col-span-1" key={nominal}>
                          <span
                            type="button"
                            className={`px-5 py-2.5 border rounded-md hover:bg-gray-50 hover:text-black cursor-pointer ${
                              isSelected
                                ? "border-green-500 text-green-500"
                                : "border-gray-200"
                            }`}
                            onClick={() => handleOptionClickNominal(value)}
                          >
                            Rp{nominal}
                          </span>
                        </div>
                        // <div className="col-span-1">
                        //   <span
                        //     type="button"
                        //     key={nominal}
                        //     className="px-5 py-2.5 border border-gray-200 rounded-md hover:bg-gray-400 hover:text-white cursor-pointer "
                        //     onClick={() => handleOptionClick(value)}
                        //   >
                        //     Rp{nominal}
                        //   </span>
                        // </div>
                      );
                    })}
                  </div>
                  <div>
                    <Button
                      type={"submit"}
                      className={
                        "w-full bg-indigo-500 hover:bg-indigo-700  px-4 py-2 text-white"
                      }
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
