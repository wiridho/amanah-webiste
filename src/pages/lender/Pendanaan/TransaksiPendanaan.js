import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postLenderFunding } from "../../../service/lender/funding";

// Icon
import { BiWallet } from "react-icons/bi";
import { FormatMataUang } from "../../../utils/FormatMataUang";
import { IoWarningOutline } from "react-icons/io5";
import { Button, Input, Label, Message } from "../../../components/atom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { estimasiImbalHasil } from "../../../utils/EstimasiImbalHasil";
import { handleGetBalance } from "../../../service/balance/balance";
import CurrencyInput from "react-currency-input-field";
import { setMessage } from "../../../store/reducer/Lender/LenderFundingReducer";

const TransaksiPendanaan = ({ totalPinjaman, totalImbalHasil, setModal }) => {
  const [getInputValue, setGetInputValue] = useState("");
  const { loanId } = useParams();
  const { accessToken } = useSelector((state) => state.auth);
  const { balance } = useSelector((state) => state.balance);
  const { message } = useSelector((state) => state.lender);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Calling useForm
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getBalance = async () => {
    dispatch(handleGetBalance({ accessToken }));
  };

  useEffect(() => {
    getBalance();
  }, []);

  const validasiBalance = (amount) => {
    const data = {
      amount: totalPinjaman,
      loanId: loanId,
    };

    const saldo = parseFloat(balance);
    console.log(balance);
    if (amount > saldo) {
      console.log("entry");
      dispatch(setMessage("Saldo Tidak Cukup"));
    } else {
      dispatch(
        postLenderFunding({
          data,
          accessToken,
          navigate: () => navigate("/funder"),
        })
      );
      return true;
    }
  };

  const onSubmit = () => {
    validasiBalance(totalPinjaman);
  };

  let estImbalHasil = estimasiImbalHasil({
    totalPinjaman,
    totalImbalHasil,
    getInputValue,
  });

  const handleClose = () => {
    setModal(false);
    dispatch(setMessage(null));
  };

  console.log(estImbalHasil);

  return (
    <div>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            <Message
              status={false}
              message={message}
              visible={message !== null ? true : false}
              close={true}
              onClose={() => dispatch(setMessage(null))}
            />
          }
          <div className="flex items-center gap-3 my-3 text-gray-500">
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
                <Label>Nominal Pinjaman</Label>
                <input
                  type="text"
                  value={FormatMataUang(totalPinjaman)}
                  disabled
                  className="opacity-70 pointer-events-none py-3 px-4 block w-full bg-gray-50 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-2">
            <div>
              <span className="font-semibold">Ringkasan</span>
            </div>
            <div className="flex justify-between">
              <span>Imbal hasil</span>
              <span>{FormatMataUang(totalImbalHasil)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimasi total dana kembali</span>
              <span>
                {FormatMataUang(
                  parseInt(totalPinjaman) + parseInt(totalImbalHasil)
                )}
              </span>
            </div>
          </div>
          <Button
            type={"submit"}
            className={"mt-5 bg-blue-500 hover:bg-blue-700  text-white w-full"}
          >
            Danai
          </Button>
        </form>

        <Button
          type={"button"}
          onClick={handleClose}
          className="w-full  bg-red-500 hover:bg-red-600 text-white font-semibold mt-2  py-2 px-4"
        >
          Tutup
        </Button>
      </div>
    </div>
  );
};

export default TransaksiPendanaan;
