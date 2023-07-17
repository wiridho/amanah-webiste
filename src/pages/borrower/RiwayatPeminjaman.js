import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FormatMataUang } from "../../utils/FormatMataUang";
import moment from "moment";
import CardPinjamanBerjalan from "../../components/organism/cardPinjamanBerjalan/CardPinjamanBerjalan";
import ErrorImg from "../../assets/img/error/error.png";

const RiwayatPeminjaman = () => {
  const { loanHistory } = useSelector((state) => state.borrower);

  const activeLoan = loanHistory?.active;
  const historyLoan = loanHistory?.history;
  let progress = (activeLoan?.totalFund / activeLoan?.amount) * 100;

  const statusLoanAcitve = (params) => {
    let status = "";
    const statusWaiting = ["on request", "on process"];
    const statusSelesai = ["Repayment", "late repayment"];

    if (statusWaiting.includes(params)) {
      status = (
        <span className="text-yellow-400 bg-yellow-50 px-2 rounded">
          Menunggu Pendanaan
        </span>
      );
    }
    if (params === "disbursement") {
      status = (
        <span className="text-indigo-400 bg-indigo-50 px-2 rounded">
          Sudah Dicairkan
        </span>
      );
    }
    if (params === "in borrowing") {
      status = (
        <span className="text-indigo-400 bg-indigo-50 px-2 rounded">
          Pinjaman Terkumpul
        </span>
      );
    }
    if (statusSelesai.includes(params)) {
      status = (
        <span className="text-green-400 bg-green-50 px-2 rounded">
          Pinjaman Sudah Lunas
        </span>
      );
    }

    return status;
  };

  console.log(activeLoan);

  return (
    <div className="font-nunito-sans">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-32 rounded-lg bg-gray-100">
          <div className="bg-white rounded-md">
            <div className="flex  flex-col rounded-lg bg-white">
              <div className="border-b border-b-gray-200 p-5 flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
                <span className="text-blue-900 font-medium">
                  Pinjaman Berjalan
                </span>
              </div>
            </div>
            <div className=" flex flex-col gap-3">
              {activeLoan?.loanId === undefined ? (
                <div className="flex justify-center gap-3 items-center p-3">
                  <img src={ErrorImg} style={{ width: 20 }} alt="" />
                  <span className="text-red-500">
                    {" "}
                    Tidak ada pinjaman berjalan{" "}
                  </span>
                </div>
              ) : (
                <CardPinjamanBerjalan
                  activeLoan={activeLoan}
                  statusLoanAcitve={statusLoanAcitve}
                  progress={progress}
                />
              )}
            </div>
          </div>
        </div>
        <div className="h-32 rounded-lg bg-white lg:col-span-2">
          <div>
            <div className="flex flex-col">
              <div className="border-b border-b-gray-200 p-5 flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                  />
                </svg>

                <span className="text-blue-900 font-medium">
                  Pinjaman Selesai
                </span>
              </div>
            </div>

            <div className="relative max-h-[460px] !overflow-y-auto  sm:rounded-lg p-4 bg-white">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">No</th>
                    <th className="px-6 py-3">Tanggal Pinjam</th>
                    <th className="px-6 py-3">Nominal Pinjaman</th>
                    <th className="px-6 py-3">Imbal Hasil</th>
                    <th className="px-6 py-3">Tenor</th>
                    <th className="px-6 py-3">Kategori Peminjaman</th>
                  </tr>
                </thead>
                <tbody>
                  {historyLoan !== null &&
                    historyLoan.map((item, index) => {
                      return (
                        <tr
                          className="bg-white border-b hover:bg-gray-50 "
                          key={index}
                        >
                          <td className="px-6 py-2.5  text-gray-900 whitespace-nowrap ">
                            {index + 1}
                          </td>
                          <td className="px-6 py-2.5  text-gray-900 whitespace-nowrap ">
                            {moment(item?.date).format("DD MMM YYYY")}
                          </td>
                          <td className="px-6 py-2.5  text-gray-900 whitespace-nowrap ">
                            {FormatMataUang(item?.amount)}
                          </td>
                          <td className="px-6 py-2.5  text-gray-900 whitespace-nowrap ">
                            {item?.yieldReturn}
                          </td>
                          <td className="px-6 py-2.5  text-gray-900 whitespace-nowrap ">
                            {item?.tenor}
                          </td>
                          <td className="px-6 py-2.5  text-gray-900 whitespace-nowrap ">
                            {item?.borrowingCategory}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatPeminjaman;
