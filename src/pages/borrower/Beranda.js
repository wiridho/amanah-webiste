import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// icon
import { AiOutlineSchedule } from "react-icons/ai";
import { Badge, Button } from "../../components/atom";
import { HiOutlineInformationCircle } from "react-icons/hi";

import { getBorrowersPaymentSchedule } from "../../service/Borrower/borrower";
import { FormatMataUang } from "../../utils/FormatMataUang";
import { useNavigate } from "react-router-dom";

const Beranda = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, statusKYC } = useSelector((state) => state.auth);

  const handleGetSchedule = () => {
    dispatch(getBorrowersPaymentSchedule({ accessToken }));
  };

  useEffect(() => {
    handleGetSchedule();
  }, []);

  const schedule = {
    currentMonth: 1000000,
    paymentSchedule: [
      {
        date: "2023-06-07",
        amount: 250000,
      },
      {
        date: "2023-05-21",
        amount: 250000,
      },
      {
        date: "2023-03-12",
        amount: 150000,
      },
      {
        date: "2023-02-06",
        amount: 400000,
      },
    ],
  };

  const checkUserKYC = () => {
    if (statusKYC === "pending") {
      return (
        <Button
          className={`bg-blue-800 hover:bg-blue-900 text-white font-medium`}
          onClick={() => navigate("/borrower/kyc/status")}
        >
          Cek Status
        </Button>
      );
    } else if (statusKYC === "not verified") {
      return (
        <Button
          className={`bg-blue-800 hover:bg-blue-900 text-white font-medium`}
          onClick={() => navigate("/borrower/kyc")}
        >
          Verifikasi Data
        </Button>
      );
    } else {
      return (
        <Button
          className={`bg-blue-800 hover:bg-blue-900 text-white font-medium`}
          onClick={() => navigate("/borrower/pengajuan-pinjaman")}
        >
          Ajukan Pinjaman
        </Button>
      );
    }
  };

  return (
    <div className="grid grid-cols-6 gap-10 font-nunito-sans ">
      <div className="col-span-3">
        <div className="flex flex-col gap-4">
          <div>
            <article className="flex  flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
              <div className="flex flex-col items-center  gap-4">
                <div>
                  <span className="text-lg text-blue-900 font-semibold">
                    Limit Tersedia
                  </span>
                </div>
                <div>
                  <span className="text-3xl">
                    {FormatMataUang(schedule?.currentMonth)}
                  </span>
                </div>
                <div>{checkUserKYC()}</div>
              </div>
            </article>
          </div>
          <div>
            <article className="rounded-lg border border-gray-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 ">Pembayaran bulan ini</p>

                  <p className="text-2xl font-medium text-gray-900">
                    {FormatMataUang(schedule?.currentMonth)}
                  </p>
                </div>
                {/* <div onClick={handlePembayaran} className="cursor-pointer"> */}
                <span className="rounded-full bg-blue-100 p-3 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                {/* </div> */}
              </div>
            </article>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <article className="flex  flex-col rounded-lg bg-white">
          <div className="border-b border-b-gray-200 p-5 flex items-center gap-3">
            <AiOutlineSchedule size={25} className="text-blue-900" />
            <span className="text-blue-900 font-medium">Jadwal Pembayaran</span>
          </div>
          <div className=" flex flex-col gap-3 p-5">
            {schedule.paymentSchedule.map((item, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <span>
                    <Badge className={"bg-red-100 text-red-500"}>
                      {moment(item?.date).format("DD MMMM YYYY")}
                    </Badge>
                  </span>
                  <span className="font-medium text-gray-700 font-mono">
                    {FormatMataUang(item?.amount)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="p-5 border-t border-t-gray-200 mt-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-blue-900">
                <HiOutlineInformationCircle size={25} />
                <span className="font-medium">Keterangan</span>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-5 h-5 bg-red-100"></div>
                  <div>
                    <span className="font-medium text-gray-500 text-sm">
                      Belum dibayar
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-5 h-5 bg-green-100"></div>
                  <div>
                    <span className="font-medium text-gray-500 text-sm">
                      Sudah dibayar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Beranda;
