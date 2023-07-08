import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FormatMataUang } from "../../utils/FormatMataUang";
import moment from "moment";
import { Badge } from "../../components/atom";

const RiwayatPeminjaman = () => {
  const [tab, setTab] = useState("berjalan");
  const { accessToken } = useSelector((state) => state.auth);
  // const { loanHistory } = useSelector((state) => state.borrower);

  const loanHistory = {
    history: [
      {
        loanId: "64a7f1b088088e5e9dfa58d9",
        tenor: 3,
        amount: 500000,
        date: "2023-07-07T11:06:24.873Z",
        status: "disbursement",
        totalFund: 500000,
        yieldReturn: 50000,
        borrowingCategory: "Personal",
        purpose: "Membeli baju lebaran",
        contract:
          "https://storage.googleapis.com/amanah-p2p-lending-syariah.appspot.com/contracts/lender/loan/53bfd37083e2f16c520ed7786b58b5fdd38aaadf3797fcccf1b0a344fda3abbbd6dfce90927a222b09ffbd2b49099e70c62fafac0347889730f20df710423119.pdf",
      },
      {
        loanId: "64a7f1b088088e5e9dfa58d9",
        tenor: 3,
        amount: 500000,
        date: "2023-07-07T11:06:24.873Z",
        status: "disbursement",
        totalFund: 500000,
        yieldReturn: 50000,
        borrowingCategory: "Personal",
        purpose: "Membeli baju lebaran",
        contract:
          "https://storage.googleapis.com/amanah-p2p-lending-syariah.appspot.com/contracts/lender/loan/53bfd37083e2f16c520ed7786b58b5fdd38aaadf3797fcccf1b0a344fda3abbbd6dfce90927a222b09ffbd2b49099e70c62fafac0347889730f20df710423119.pdf",
      },
      {
        loanId: "64a7f1b088088e5e9dfa58d9",
        tenor: 3,
        amount: 500000,
        date: "2023-07-07T11:06:24.873Z",
        status: "disbursement",
        totalFund: 500000,
        yieldReturn: 50000,
        borrowingCategory: "Personal",
        purpose: "Membeli baju lebaran",
        contract:
          "https://storage.googleapis.com/amanah-p2p-lending-syariah.appspot.com/contracts/lender/loan/53bfd37083e2f16c520ed7786b58b5fdd38aaadf3797fcccf1b0a344fda3abbbd6dfce90927a222b09ffbd2b49099e70c62fafac0347889730f20df710423119.pdf",
      },
    ],
    active: {
      loanId: "101010101010101010",
      tenor: 6,
      amount: 1000000,
      date: "2023-07-07T11:06:24.873Z",
      status: "disbursement",
      totalFund: 550000,
      yieldReturn: 70000,
      borrowingCategory: "Personal",
      purpose: "Modal Bisnis Ternak Lele ",
      contract:
        "https://storage.googleapis.com/amanah-p2p-lending-syariah.appspot.com/contracts/lender/loan/53bfd37083e2f16c520ed7786b58b5fdd38aaadf3797fcccf1b0a344fda3abbbd6dfce90927a222b09ffbd2b49099e70c62fafac0347889730f20df710423119.pdf",
    },
  };

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
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                  />
                </svg>

                <span className="text-blue-900 font-medium">
                  Pinjaman Berjalan
                </span>
              </div>
            </div>
            <div className=" flex flex-col gap-3">
              {activeLoan?.length < 1 ? (
                <div className="flex justify-center items-center">
                  <span> Tidak ada pinjaman berjalan </span>
                </div>
              ) : (
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
                          <span className="text-base text-gray-800">
                            Tanggal Pinjam
                          </span>
                          <span className="font-semibold  text-gray-700">
                            {moment(activeLoan?.date).format("DD MMM YYYY")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-base text-gray-800">
                            Tujuan
                          </span>
                          <span className="font-semibold  text-gray-700">
                            {activeLoan?.purpose}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-base text-gray-800">
                            Status Pinjaman
                          </span>
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
                            <span className="text-[13px] text-[#194175] ">
                              Terdanai
                            </span>
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
