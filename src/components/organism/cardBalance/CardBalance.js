import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleGetBalance } from "../../../service/balance/balance";
import { useDispatch, useSelector } from "react-redux";
import ImgHeader from "../../../assets/img/Financial-Management.png";
// Icons
import { HiOutlinePlus } from "react-icons/hi";
import { IoWallet } from "react-icons/io5";

// Component
import { Button, Message } from "../../atom";
import { useEffect } from "react";
import { FormatMataUang } from "../../../utils/FormatMataUang";
import { getLenderStatusKYC } from "../../../service/lender/lenderVerificationKYC";
import { setStatusKYC } from "../../../store/reducer/AuthReducer";
import { setMessage } from "../../../store/reducer/Balance/BalanceReducer";
import WarningMessage from "../../atom/warningMessage/WarningMessage";
import { useState } from "react";

const CardBalance = () => {
  const [warningMessage, setWarningMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  const { balance, message } = useSelector((state) => state.balance);

  const statusKYC = "not verified";

  const checkUserKYC = () => {
    if (statusKYC === "pending") {
      dispatch(setMessage("akun anda sedang dalam tinjauan"));
      return (
        <WarningMessage
          to={"/funder/kyc"}
          message={message}
          visible={message !== null ? true : false}
          onClose={() => dispatch(setMessage(null))}
        />
      );
    } else if (statusKYC === "not verified") {
      return (
        <Message
          status={false}
          message={message}
          visible={message !== null && !true ? true : false}
          onClose={() => {
            dispatch(setMessage(null));
          }}
        />
      );
    } else {
      return (
        <Button
          className={`bg-blue-800 hover:bg-blue-900 text-white font-medium`}
          onClick={() => navigate("/funder/pengajuan-pinjaman")}
        >
          Ajukan Pinjaman
        </Button>
      );
    }
  };

  const checkStatus = () => {
    let status = "";
    if (statusKYC === "not verified") {
      // dispatch(
      //   setMessage(
      //     "Akun Belum Diverifikasi, silahkan verifikasi terlebih dahulu"
      //   )
      // );
      return (status = (
        <Button
          className={`bg-blue-800 hover:bg-blue-900 text-white font-medium`}
          onClick={() => navigate("/borrower/kyc/status")}
        >
          {message}. Silahkan ke halaman ini
        </Button>
      ));
    } else if (statusKYC === "pending") {
      dispatch(setMessage("Akun anda sedang ditinjau"));
    }
    return status;
  };

  const getBalance = async () => {
    dispatch(handleGetBalance({ accessToken }));
  };

  const getStatusKYC = async () => {
    const response = await getLenderStatusKYC({ accessToken });
    console.log(response);
    dispatch(setStatusKYC(response?.data?.kyc));
  };

  useEffect(() => {
    getBalance();
    getStatusKYC();
    // checkStatus();
    checkUserKYC();
  }, [dispatch, balance, statusKYC]);

  console.log(message);

  return (
    <>
      <div className="rounded-md shadow-md bg-white  grid grid-cols-2">
        <div className="flex flex-col gap-4 p-12 py-12">
          <article className="flex text-darkBlue mb-10 flex-col gap-4 rounded-md">
            <div className="flex flex-col items-start  gap-2">
              <div className="flex justify-center items-center gap-2">
                <IoWallet size={20} className="text-darkBlue" />
                <span className="text-xl text-blue-900 font-semibold">
                  Saldo Akun
                </span>
                <div>{checkUserKYC()}</div>
              </div>
              <div>
                <span className="text-4xl font-sans">
                  {FormatMataUang(balance)}
                </span>
              </div>
            </div>
          </article>
          <div className="flex gap-5">
            <div className=" flex justify-center items-center">
              <Link
                to={statusKYC === "verified" ? "deposit" : "#"}
                className={`flex justify-center items-center  bg-blue-500 rounded-full px-5 py-2.5 ${
                  statusKYC === "verified"
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
              >
                <div className="flex gap-2 justify-center items-center ">
                  <p className="font-semibold text-white">Deposit </p>
                </div>
              </Link>
            </div>
            <div className=" flex justify-center items-center  ">
              <Link
                to={statusKYC === "verified" ? "withdraw" : "#"}
                className={`flex justify-center border border-blue-500 rounded-full px-5 py-2.5    ${
                  statusKYC === "verified"
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
              >
                <div className="flex gap-2 justify-center items-center">
                  <p className="font-semibold text-blue-500">Withdraw</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className=" flex justify-center">
          <img
            style={{}}
            src={ImgHeader}
            className="h-[290px] "
            alt=""
            srcset=""
          />
        </div>
      </div>
    </>
  );
};

export default CardBalance;
