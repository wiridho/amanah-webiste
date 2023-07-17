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
import TopupImg from "../../assets/img/topup/topup.png";

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
    "3.000.000",
    "2.500.000",
    "2.000.000",
    "1.000.000",
    "500.000",
    "300.000",
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
    <div className="flex justify-center items-center h-screen font-nunito-sans">
      <StatusKYC
        component={
          paymentStatus === "waitingPayment" ? (
            <div className="w-2/5 flex flex-col  bg-white border border-gray-200 shadow-sm rounded-xl ">
              <div className="h-52 overflow-hidden flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
                <img
                  src={DepositImg}
                  alt=""
                  className="mt-[-6px]"
                  style={{ height: "300px" }}
                />
              </div>
              <div className="p-4 md:p-6">
                <div className="flex flex-col gap-3">
                  <h3 className="lg:text-2xl font-semibold text-gray-800">
                    Deposit Dana
                  </h3>
                  <p className="mt-4 mb-5 text-gray-500">
                    Klik tombol di bawah untuk melakukan deposit. Anda akan
                    diarahkan ke flip untuk menyelesaikan proses pembayaran.
                    Dana di Aplikasi Amanah akan bertambah setelah pembayaran
                    selesai.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <a
                    className="flex justify-center text-blue-500 px-4 py-2"
                    href={paymentLink}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="flex items-center justify-center gap-1 font-medium">
                      Lanjutkan Pembayaran
                      <HiOutlineChevronRight />
                    </span>
                  </a>
                  <Button
                    onClick={() => setPaymentStatus(null)}
                    className={`border border-red-500 text-red-500 w-full`}
                  >
                    Kembali
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-2/5 p-6 rounded-lg bg-white border border-gray-200 shadow">
              <div className="flex flex-col gap-4 mb-2">
                <p className="text-2xl  text-gray-700 text-center font-semibold">
                  Deposit
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src={TopupImg}
                    className="w-1/2 flex items-center justify-center "
                    alt=""
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5">
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
                          className="w-full border border-gray-300 px-4 lg:px-5 lg:py-2.5 py-2 rounded-lg bg-gray-50 focus:ring-1 outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 text-sm">Select one :</span>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {nominalOptions.map((nominal) => {
                        const value = Number(nominal.replace(/[.,]/g, ""));
                        const isSelected = selectedNominal === value;
                        return (
                          <div className="col-span-1" key={nominal}>
                            <span
                              type="button"
                              className={`text-center py-2.5 text-sm sm:text-sm  border w-full rounded-md hover:bg-gray-50 hover:text-black cursor-pointer ${
                                isSelected
                                  ? "border-green-500 text-green-500"
                                  : "border-gray-200"
                              }`}
                              onClick={() => handleOptionClickNominal(value)}
                            >
                              Rp{nominal}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <Button
                      type={"submit"}
                      className={
                        "w-full bg-blue-500 hover:bg-blue-700  px-4 py-2 text-white"
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
