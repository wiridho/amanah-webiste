import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// icon
import { AiOutlineSchedule } from "react-icons/ai";
import { Badge, Button } from "../../components/atom";
import { HiOutlineInformationCircle } from "react-icons/hi";

import { getBorrowersPaymentSchedule } from "../../service/Borrower/borrower";
import { FormatMataUang } from "../../utils/FormatMataUang";

const Beranda = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

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

  return (
    <div className="grid grid-cols-6 gap-8 font-nunito-sans ">
      <div className="col-span-3">
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
            <div>
              <Button
                className={
                  "bg-blue-800 hover:bg-blue-900 text-white font-medium"
                }
              >
                Verfikasi Data
              </Button>
            </div>
          </div>
        </article>
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
