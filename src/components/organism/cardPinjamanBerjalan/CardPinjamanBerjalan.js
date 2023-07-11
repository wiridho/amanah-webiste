import React from "react";
import { FormatMataUang } from "../../../utils/FormatMataUang";
import moment from "moment";

const CardPinjamanBerjalan = ({ activeLoan, statusLoanAcitve, progress }) => {
  return (
    <div>
      <div className="shadow-md">
        <div className="">
          <div className="flex flex-col justify-between p-5">
            <div className="flex flex-col text-center	bg-blue-100 p-4 rounded-md">
              <span className="text-blue-600">Pinjaman Kamu</span>
              <span className="text-2xl font-semibold text-blue-600">
                {FormatMataUang(activeLoan?.amount)}
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-base text-gray-800">
                  Estimasi Imbal Hasil
                </span>
                <span className="font-semibold  text-gray-700">
                  {FormatMataUang(activeLoan?.yieldReturn)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-gray-800">Tenor</span>
                <span className="font-semibold  text-gray-700">
                  {activeLoan?.tenor} Bulan
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-gray-800">
                  Kategori Pinjaman
                </span>
                <span className="font-semibold  text-gray-700">
                  {activeLoan?.borrowingCategory}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-gray-800">Tanggal Pinjam</span>
                <span className="font-semibold  text-gray-700">
                  {moment(activeLoan?.date).format("DD MMM YYYY")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-gray-800">Tujuan</span>
                <span className="font-semibold  text-gray-700">
                  {activeLoan?.purpose}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-gray-800">Status Pinjaman</span>
                <span className="font-semibold  text-gray-700">
                  {statusLoanAcitve(activeLoan?.status)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <span className="rounded-md ">
          <div className="border-t-[1px] rounded-b-md">
            <div className="py-3 px-5">
              <div className="flex gap-6 mb-2">
                <div className="flex flex-col ">
                  <span className="text-[13px] text-[#194175] ">Terdanai</span>
                  <span className="text-sm text-[#194175] font-semibold">
                    {progress.toFixed(2)}%
                  </span>
                </div>
                <div className="border-r-[1px]"></div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#194175] ">
                    Pinjaman Terkumpul
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {FormatMataUang(activeLoan?.totalFund)}
                  </span>
                </div>
              </div>
              <span
                role="progressbar"
                aria-labelledby="ProgressLabel"
                className="block rounded-full bg-gray-200"
              >
                <span
                  className="block h-4 rounded-full  bg-green-400  text-center text-[10px]/4"
                  style={{ width: `${progress}%` }}
                >
                  <span className="font-bold text-white">
                    {progress.toFixed(2)}%
                  </span>
                </span>
              </span>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default CardPinjamanBerjalan;
