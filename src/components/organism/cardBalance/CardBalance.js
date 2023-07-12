import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleGetBalance } from "../../../service/balance/balance";
import { useDispatch, useSelector } from "react-redux";
import ImgHeader from "../../../assets/img/Financial-Management.png";
// Icons
import { IoWallet } from "react-icons/io5";

// Component
import { Button, Message } from "../../atom";
import { FormatMataUang } from "../../../utils/FormatMataUang";
import { getLenderStatusKYC } from "../../../service/lender/lenderVerificationKYC";
import { setStatusKYC } from "../../../store/reducer/AuthReducer";
import { setMessage } from "../../../store/reducer/Balance/BalanceReducer";
import StatusKYC from "../../molekul/statusKYC/StatusKYC";

const CardBalance = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  const { balance, message } = useSelector((state) => state.balance);

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
  }, [dispatch, balance]);

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
              </div>
              <div>
                <span className="text-4xl font-sans">
                  {FormatMataUang(balance)}
                </span>
              </div>
            </div>
          </article>
          <div>
            <StatusKYC
              component={
                <div className="flex gap-5">
                  <div className=" flex justify-center items-center">
                    <Link
                      to={"deposit"}
                      className={`flex justify-center items-center  bg-blue-500 rounded-full px-5 py-2.5 cursor-pointer`}
                    >
                      <div className="flex gap-2 justify-center items-center ">
                        <p className="font-semibold text-white">Deposit </p>
                      </div>
                    </Link>
                  </div>
                  <div className=" flex justify-center items-center  ">
                    <Link
                      to={"withdraw/listBank"}
                      className={`flex justify-center border border-blue-500 rounded-full px-5 py-2.5 cursor-pointer`}
                    >
                      <div className="flex gap-2 justify-center items-center">
                        <p className="font-semibold text-blue-500">Withdraw</p>
                      </div>
                    </Link>
                  </div>
                </div>
              }
            />
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
