import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Asset
import Withdraw from "../../../assets/img/dashboardLender/withdraw.svg";

// Icons
import { HiOutlinePlus } from "react-icons/hi";
import { IoWallet } from "react-icons/io5";

// Component
import { ErrorMessage } from "../../atom";

const Card = () => {
  // const { statusKYC } = useSelector((state) => state.auth);
  const statusKYC = "not verified";
  // const toDeposit = () => {

  // }

  const checkStatus = () => {
    let status = <> </>;
    if (statusKYC === "not verified") {
      status = <ErrorMessage message={"Akun Not Verified"} />;
    } else if (statusKYC === "pending") {
      status = <ErrorMessage message={"Akun kamu sedang diperiksa Pending"} />;
    }
    return status;
  };

  return (
    <>
      {checkStatus()}
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

          <Link
            to={statusKYC === "verified" ? "deposit" : "#"}
            className={`flex justify-center items-center  rounded-xl shadow-md transform transition duration-500 hover:scale-105 bg-white ${
              statusKYC === "verified" ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            <div className="flex flex-col justify-center items-center ">
              <HiOutlinePlus
                className={` text-white  ${
                  statusKYC === "verified"
                    ? "bg-darkBlue "
                    : "bg-gray-500 cursor-not-allowed"
                }  text-2xl p-1 rounded-full`}
              />
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
