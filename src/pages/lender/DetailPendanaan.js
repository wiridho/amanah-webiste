import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// Service
import { getDetailLoan } from "../../service/loans/loan";

// Component
import { Button, BreadCumb } from "../../components/atom";

// Icon
import {
  HiClipboardCheck,
  HiOutlineCash,
  HiOutlineCreditCard,
  HiOutlineFastForward,
  HiOutlineHome,
} from "react-icons/hi";
import { FaFilePdf } from "react-icons/fa";
import { FormatMataUang } from "../../utils/FormatMataUang";
import { BsPersonFill } from "react-icons/bs";
import { BiCategoryAlt, BiCoinStack, BiTimer } from "react-icons/bi";
import { MdOutlineSentimentSatisfied } from "react-icons/md";

import TransaksiPendanaan from "./Pendanaan/TransaksiPendanaan";

import { TruncateString } from "../../utils/Truncate";
import { titleCase } from "../../utils/FormatTitleCase";

const DetailPendanaan = () => {
  const [load, setLoad] = useState(true);

  const [openModalVerified, setOpenModalVerified] = useState(false);
  const [openModalPending, setOpenModalPending] = useState(false);
  const [openModalNotVerified, setOpenModalNotVerified] = useState(false);

  const { accessToken, statusKYC } = useSelector((state) => state.auth);
  const { loanId } = useParams();

  const [detailData, setDetailData] = useState(null);
  let progress = (detailData?.totalFunding / detailData?.amount) * 100;

  useEffect(() => {
    (async () => {
      if (load) {
        const response = await getDetailLoan({ accessToken, loanId });
        setDetailData(response?.data);
        setLoad(false);
      }
    })();
  }, [load, detailData]);

  const onClick = () => {
    if (statusKYC === "verified") {
      setOpenModalVerified(true);
    } else if (statusKYC === "pending") {
      setOpenModalPending(true);
    } else {
      setOpenModalNotVerified(true);
    }
  };

  const breadCumbLinks = [
    { to: "beranda", label: <HiOutlineHome className="h-5 w-5" /> },
    { to: "/funder/pendanaan", label: "Pendanaan" },
    { to: "#", label: "Detail Pendanaan", bold: true },
  ];

  console.log(detailData ? detailData : "loading");

  // console.log("loanId", loanId);

  return (
    <div className="">
      {detailData === null ? (
        <div>'Data Kosong'</div>
      ) : (
        <div className="font-nunito-sans">
          <BreadCumb links={breadCumbLinks} />
          <div className="grid grid-cols-3 gap-3 pt-10">
            <div className="col-span-2 ">
              <div className="">
                <div className="flex flex-col gap-4">
                  {/* Informasi Peminjam */}
                  <div className=" ">
                    <span className="font-semibold inline-block mb-2 text-sm ">
                      Informasi Peminjam
                    </span>
                    <div className="rounded bg-white overflow-hidden shadow flex flex-col">
                      <div className=" inset-0 bg-[#4381cf] text-white px-2 py-2 ">
                        <span className="transititext-primary flex items-center gap-2 text-base font-semibold ">
                          <HiClipboardCheck className="text-2xl" />
                          {TruncateString(
                            titleCase(detailData?.borrowingCategory),
                            20
                          )}
                        </span>
                      </div>
                      <div className="flex  flex-col  gap-3 px-6 py-4">
                        <div className="flex items-center gap-4">
                          <BsPersonFill className="text-4xl text-gray-500" />
                          <span className="text-lg font-semibold text-[#303030]">
                            {detailData?.borrower?.name}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 ">
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              Total dana dipinjam
                            </span>
                            <span className="font-semibold">
                              {FormatMataUang(
                                detailData?.borrower?.performance
                                  ?.borrowingRecord?.borrowerFund
                              )}
                            </span>
                          </div>
                          <div className="flex flex-col ">
                            <span className="text-gray-500 text-sm">
                              Total peminjaman
                            </span>
                            <span className="font-semibold">
                              {
                                detailData?.borrower?.performance
                                  ?.borrowingRecord?.totalBorrowing
                              }{" "}
                              Pinjaman
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              Kredit skor
                            </span>
                            <span className="font-semibold">
                              {detailData?.risk}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Informasi Peminjam */}

                  {/* Kontrak */}
                  <div className="block rounded bg-white shadow sm:p-3 lg:p-3">
                    <div className="flex items-center justify-between gap-2 px-2">
                      <div className="flex items-center gap-3">
                        <FaFilePdf className="text-gray-300 w-8 h-8" />
                        <p className="text-md font-semibold text-gray-800">
                          Kontrak pembiayaan
                        </p>
                      </div>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={detailData?.contract}
                        className="underline font-semibold text-blue-800 hover:text-blue-950"
                      >
                        Lihat
                      </a>
                    </div>
                  </div>
                  {/* Kontrak */}

                  {/* Keterangan Funding */}
                  <div className="mb-5">
                    <article className="overflow-hidden rounded-md border border-gray-100 bg-white shadow">
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col gap-2">
                          <div>
                            <div className="flex items-center gap-3  text-gray-600">
                              <HiOutlineCash size={20} />
                              <span className="font-medium">
                                Jumlah Pembiayaan
                              </span>
                            </div>
                            <span className="font-bold font-mono">
                              {FormatMataUang(detailData?.amount)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-3 text-gray-600">
                              <HiOutlineCreditCard size={20} />
                              <span className=" font-semibold ">
                                Skema Pengembalian
                              </span>
                            </div>
                            <span className="font-semibold text-sm">
                              {detailData?.paymentSchema}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-3 text-gray-600">
                              <BiCategoryAlt size={20} />
                              <span className=" font-semibold ">
                                Kategori Pinjaman
                              </span>
                            </div>
                            <span className="font-semibold text-sm ">
                              {detailData?.borrowingCategory}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-3 text-gray-600">
                              <BiCoinStack size={20} />
                              <span className=" font-semibold ">
                                Tujuan Peminjaman
                              </span>
                            </div>
                            <span className="font-semibold text-sm">
                              {detailData?.purpose}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>

                  {/* Performa Peminjam */}
                  <div className="">
                    <div>
                      <div className="rounded-md  bg-white overflow-hidden shadow flex flex-col px-6 py-4">
                        <div className="flex flex-col gap-6">
                          <div className="flex flex-col gap-2">
                            <span className="font-semibold  text-[#545454]">
                              Performa Pengembalian Dana
                            </span>
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between">
                                <span className="flex items-center gap-2 font-semibold text-gray-700">
                                  <HiOutlineFastForward
                                    size={30}
                                    className="text-gray-400 "
                                  />
                                  Dipercepat
                                </span>
                                <span>
                                  {
                                    detailData?.borrower?.performance?.repayment
                                      ?.earlier
                                  }
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="flex items-center gap-2 font-semibold text-gray-700">
                                  <MdOutlineSentimentSatisfied
                                    size={30}
                                    className=" text-gray-400"
                                  />
                                  Tepat Waktu
                                </span>
                                <span>
                                  {
                                    detailData?.borrower?.performance?.repayment
                                      ?.onTime
                                  }
                                </span>
                              </div>
                              <div className="flex justify-between gap-2">
                                <span className="flex items-center gap-2 font-semibold text-gray-700">
                                  <BiTimer
                                    size={30}
                                    className=" text-gray-400"
                                  />
                                  Terlambat
                                </span>
                                <span>
                                  {
                                    detailData?.borrower?.performance?.repayment
                                      ?.late
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Informasi Peminjam */}
                </div>
              </div>
            </div>

            <div className="col-span-1 ">
              <div className="sticky  top-[20px]">
                {/* Card Funding */}
                <span className="font-semibold inline-block mb-2 text-sm ">
                  Progress Pendanaan
                </span>
                <div className="block p-5 bg-white border border-gray-200 rounded-lg shadow">
                  {/* <h3 className=" text-sm font-semibold ">Status Pendanaan</h3> */}
                  <div className="flex justify-between ">
                    <p className="mt-2 hidden text-sm sm:block font-semibold">
                      Sisa Slot
                    </p>
                    <p className="mt-2 hidden text-sm sm:block">
                      {FormatMataUang(
                        detailData?.amount - detailData?.totalFunding
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="mt-2 hidden text-sm sm:block font-semibold">
                      Terdanai
                    </p>
                    <p className="mt-2 hidden text-sm sm:block">
                      {FormatMataUang(detailData?.totalFunding)}
                    </p>
                  </div>
                  {/* Progress */}
                  <div className="my-3">
                    <span
                      role="progressbar"
                      aria-labelledby="ProgressLabel"
                      aria-valuenow="50"
                      className="block rounded-full bg-gray-200"
                    >
                      <span
                        className="block h-4 rounded-full bg-green-500 text-center text-[10px]/4"
                        style={{ width: `${progress}%` }}
                      >
                        <span className="font-bold text-white">
                          {progress.toFixed(2)} %
                        </span>
                      </span>
                    </span>
                  </div>
                  {/* End Progress */}
                  <Button
                    onClick={onClick}
                    type={"button"}
                    className={
                      "bg-indigo-700 hover:bg-indigo-800 text-white font-semibold !rounded-full w-full"
                    }
                  >
                    Danai Sekarang
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal Verified */}
          <div
            className={`z-10 fixed flex items-center justify-center  inset-0 backdrop-brightness-50 transition-opacity ${
              openModalVerified ? "" : "hidden"
            }`}
          >
            <div className=" max-w-md w-full bg-white p-6 rounded-md flex flex-col gap-3">
              <TransaksiPendanaan
                sisaPendanaan={detailData?.amount - detailData?.totalFunding}
                totalImbalHasil={detailData?.yieldReturn}
                totalPinjaman={detailData?.amount}
              />
              <button
                onClick={() => setOpenModalVerified(false)}
                className="w-full rounded-full bg-red-500 text-white font-semibold  py-2 px-4"
              >
                Tutup
              </button>
            </div>
          </div>
          {/* Modal Pending */}
          <div
            className={`z-10 fixed flex items-center justify-center transition-transform duration-1000 inset-0 backdrop-brightness-50 ${
              openModalPending ? "" : "hidden"
            }`}
          >
            <div className=" bg-white w-full max-w-md rounded-md">
              <div className=" w-full max-w-2xl max-h-full  ">
                {/* Modal header */}
                <div className="flex items-start justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Verifikasi KYC sedang diproses
                  </h3>
                </div>
                {/* Modal body */}
                <div className="p-6 space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 ">
                    Mohon tunggu, kami akan infokan ketika peninjauan telah
                    selesai{" "}
                    <Link
                      className="underline text-blue-700 hover:text-blue-900"
                      to={"/funder/kyc"}
                    >
                      kembali ke halaman utama!
                    </Link>
                  </p>
                </div>
                {/* Modal footer */}
                <div className="flex items-center px-5 py-3 space-x-2 justify-end border-t border-gray-200 rounded-b ">
                  <button
                    onClick={() => setOpenModalPending(false)}
                    className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal Not Verified */}
          <div
            className={`z-10 flex items-center justify-center fixed inset-0 backdrop-brightness-50 transition-opacity  ${
              openModalNotVerified
                ? "opacity-100"
                : "hidden opacity-0 pointer-events-none"
            }`}
          >
            <div className=" bg-white w-full max-w-md rounded-md">
              <div className=" w-full max-w-2xl max-h-full  ">
                {/* Modal header */}
                <div className="flex items-start justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Akun belum diverifikasi
                  </h3>
                </div>
                {/* Modal body */}
                <div className="p-6 space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 ">
                    Akun anda belum verifikasi KYC, silahkan verifikasi terlebih
                    dahulu{" "}
                    <Link
                      className="underline text-blue-700 hover:text-blue-800"
                      to={"/funder/kyc"}
                    >
                      disini!
                    </Link>
                  </p>
                </div>
                {/* Modal footer */}
                <div className="flex items-center px-5 py-3 space-x-2 border-t border-gray-200 rounded-b ">
                  <button
                    onClick={() => setOpenModalNotVerified(false)}
                    className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPendanaan;
