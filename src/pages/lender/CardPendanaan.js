import React from "react";
import { Link } from "react-router-dom";
// Icon
import { BsPersonFill } from "react-icons/bs";
import { BiCoinStack } from "react-icons/bi";
// Utils
import { FormatMataUang } from "../../utils/FormatMataUang";
import { titleCase } from "../../utils/FormatTitleCase";
import { TruncateString } from "../../utils/Truncate";

const CardPendanaan = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => {
        let progress = (item.totalFunding / item.amount) * 100;
        return (
          <Link to={`${item.loanId}`} key={index}>
            <div className="flex bg-white mb-6 p-3 lg:p-5 relative rounded">
              <div className="absolute top-0 left-0 bg-[#4381cf] text-white  rounded-r-full px-2 py-1 ">
                <span
                  className="transititext-primary  transition duration-100 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 font-semibold "
                  data-te-toggle="tooltip"
                  title={titleCase(item.borrowingCategory)}
                >
                  {TruncateString(titleCase(item.borrowingCategory), 20)}
                </span>
              </div>
              <div className="grow mt-4 ">
                <div className="flex h-full ">
                  <div className="mt-4">
                    <div className=" flex justify-center items-center h-12 w-12 rounded-full border-2  border-indigo-400 ">
                      <BsPersonFill className="h-9 w-9 text-indigo-600" />
                    </div>
                  </div>
                  <div className="text-left  ml-2 p-2">
                    <h1 className="text-lg font-semibold text-[#303030]">
                      {TruncateString(item.borrower.name, 16)}
                    </h1>
                    <div className="flex flex-col items-start">
                      <h1 className="text-xs pt-2 font-semibold text-[#303030]">
                        Imbal hasil
                      </h1>
                      <h4 className="flex mt-2 items-center">
                        <BiCoinStack className=" w-5 h-5 text-indigo-600 rounded mr-1" />
                        <span className="text-base">
                          {FormatMataUang(item.yieldReturn)}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-3/4 p-4 mt-4">
                <div>
                  <div className="grid grid-cols-6 font-lato">
                    <div className="flex flex-col gap-2 col-span-2 ">
                      <span className="text-xs text-gray-600 ">
                        Jumlah Pinjaman
                      </span>
                      <span className="font-bold text-base text-gray-custom1 ">
                        Rp. {FormatMataUang(item.amount)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 col-span-2 ">
                      <span className="text-xs text-gray-600 ">
                        Metode Pembayaran
                      </span>
                      <span className=" text-sm text-grayCustom1 font-semibold">
                        {item.paymentSchema}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-gray-600 ">Tenor</span>
                      <div className="font-semibold text-sm text-grayCustom1 ">
                        <span>{item.tenor} Bulan</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-gray-600 ">Purpose</span>
                      <span className="font-semibold text-sm text-grayCustom1">
                        {TruncateString(item.purpose, 36)}
                      </span>
                    </div>
                  </div>
                  {/* Progress */}
                  <div className="mt-5">
                    <span className="block text-xs mb-2 text-grayCustom1">
                      Sisa Pendanaan:{" "}
                      <span className="font-semibold	">
                        {FormatMataUang(item.amount - item.totalFunding)}
                      </span>
                    </span>
                    <span
                      role="progressbar"
                      aria-labelledby="ProgressLabel"
                      className="block rounded-full bg-gray-200"
                    >
                      <span
                        className="block h-4 rounded-full bg-green-500 text-center text-[10px]/4"
                        style={{ width: `${progress}%` }}
                      >
                        <span className="font-bold text-white">
                          {progress.toFixed(2)}%
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CardPendanaan;
