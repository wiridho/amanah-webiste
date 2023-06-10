import React from "react";
import Withdraw from "../../../assets/img/dashboardLender/withdraw.svg";
import { BiMoneyWithdraw } from "react-icons/bi";
import { HiOutlinePlus } from "react-icons/hi";
import { IoWallet } from "react-icons/io5";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <>
      <div className="max-w-md w-full p-3 bg-slate-300 rounded-xl shadow-lg">
        <div className="grid grid-cols-4 gap-8 max-w-3xl mx-auto">
          <div className="col-span-2 bg-white  rounded-lg p-4 transform transition duration-500 hover:scale-105">
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <p className="text-md   tracking-tight text-slate-900">
                  Balance
                </p>
                <span>
                  <IoWallet className="text-3xl text-darkBlue" />
                </span>
              </div>
              <div className="">
                <p className=" text-xl font-semibold text-darkBlue">
                  Rp500.000,00
                </p>
              </div>
            </div>
          </div>

          <Link className="flex justify-center items-center  rounded-xl shadow-md transform transition duration-500 hover:scale-105 bg-white ">
            <div className="flex flex-col justify-center items-center ">
              <HiOutlinePlus className=" text-white bg-darkBlue text-2xl p-1 rounded-full" />
              <p className="pt-1">Deposit</p>
            </div>
          </Link>

          <Link className="flex justify-center items-center rounded-xl transform transition duration-500 hover:scale-105 shadow-md bg-white">
            <div className="flex flex-col justify-center items-center">
              <div className="bg-darkBlue p-[5px] rounded-full">
                <img
                  src={Withdraw}
                  alt="logoWithdraw"
                  className="w-5 h-5 text-red rounded"
                />
              </div>
              <p className="pt-1">Withdraw</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
