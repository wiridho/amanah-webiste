import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Service
import { getDetailLoan } from "../../service/loans/loan";

// Component
import { Button, BreadCumb } from "../../components/atom";
import TransaksiPendanaan from "./Pendanaan/TransaksiPendanaan";

// Icon
import {
  HiClipboardCheck,
  HiOutlineCash,
  HiOutlineCreditCard,
  HiOutlineFastForward,
  HiOutlineHome,
} from "react-icons/hi";
import { FormatMataUang } from "../../utils/FormatMataUang";
import { BsFiletypePdf, BsPersonFill } from "react-icons/bs";
import { BiCategoryAlt, BiCoinStack, BiTimer } from "react-icons/bi";
import { MdOutlineSentimentSatisfied } from "react-icons/md";
import { TbCalendarDue } from "react-icons/tb";
import { FaBalanceScale } from "react-icons/fa";

import { TruncateString } from "../../utils/Truncate";
import { titleCase } from "../../utils/FormatTitleCase";
import { getLenderFunding } from "../../service/lender/portofolio";

const DetailPendanaan = () => {
  const { loanId } = useParams();
  const { accessToken, statusKYC } = useSelector((state) => state.auth);
  const [load, setLoad] = useState(true);
  const [detailData, setDetailData] = useState(null);
  let progress = (detailData?.totalFunding / detailData?.amount) * 100;

  console.log(detailData);

  const [openModalVerified, setOpenModalVerified] = useState(false);
  const [openModalPending, setOpenModalPending] = useState(false);
  const [openModalNotVerified, setOpenModalNotVerified] = useState(false);
  const location = useLocation();
  const { state } = location;

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getLenderFunding({ accessToken }));
  }, [dispatch, accessToken]);

  console.log(state);

  return (
    <div className="font-nunito-sans">
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
                    <span className="font-semibold inline-block mb-2 text-darkBlue text-base ">
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
                        <div className="flex justify-between">
                          <div className="flex items-center gap-4">
                            <BsPersonFill className="text-4xl text-gray-500" />
                            <span className="text-lg font-semibold text-[#303030]">
                              {TruncateString(
                                titleCase(detailData?.borrower?.name),
                                20
                              )}
                            </span>
                          </div>
                          {/* <div className="bg-gray-200 hover:bg-gray-300 m-2 p-3 rounded-md">
                            <div className="flex items-center gap-2">
                              <BsFiletypePdf
                                size={20}
                                className="text-gray-800"
                              />
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={detailData?.contract}
                                className=" font-semibold text-gray-800"
                              >
                                Kontrak
                              </a>
                            </div>
                          </div> */}
                          {state ? (
                            <div className="bg-gray-200 hover:bg-gray-300 m-2 p-3 rounded-md">
                              <div className="flex items-center gap-2">
                                <BsFiletypePdf
                                  size={20}
                                  className="text-gray-800"
                                />
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={state?.contract}
                                  className=" font-semibold text-gray-800"
                                >
                                  Kontrak
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gray-200 hover:bg-gray-300 m-2 p-3 rounded-md">
                              <div className="flex items-center gap-2">
                                <BsFiletypePdf
                                  size={20}
                                  className="text-gray-800"
                                />
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={detailData?.contract}
                                  className=" font-semibold text-gray-800"
                                >
                                  Kontrak
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-3 ">
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              Total dana dipinjam
                            </span>
                            <span className="font-semibold">
                              {FormatMataUang(
                                detailData?.borrower?.performance
                                  ?.borrowingRecord?.borrowedFund
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

                  {/* Link Produk */}
                  <div className="block rounded bg-white shadow sm:p-3 lg:p-3">
                    <div className="flex items-center justify-between gap-2 px-2">
                      <div className="flex items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                        <p className="text-md font-semibold text-gray-800">
                          Produk yang akan dibeli
                        </p>
                      </div>

                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={detailData?.productLink}
                        className="underline font-semibold text-blue-800 hover:text-blue-950"
                      >
                        Lihat Produk
                      </a>
                    </div>
                  </div>
                  {/* Kontrak */}

                  {/* Keterangan Funding */}
                  <div>
                    <article className="overflow-hidden rounded-md border border-gray-100 bg-white shadow">
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col gap-2">
                          <div>
                            <div className="flex items-center gap-2  text-gray-600">
                              <HiOutlineCash size={20} />
                              <span className="font-medium">
                                Jumlah Pembiayaan
                              </span>
                            </div>
                            <span className="font-bold text-slate-700 text-lg font-mono">
                              {FormatMataUang(detailData?.amount)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <FaBalanceScale size={20} />
                              <span className=" font-semibold ">
                                Imbal Hasil
                              </span>
                            </div>
                            <span className=" font-mono">
                              {FormatMataUang(detailData?.yieldReturn)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-gray-600">
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
                            <div className="flex items-center gap-2 text-gray-600">
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
                            <div className="flex items-center gap-2 text-gray-600">
                              <TbCalendarDue size={20} />
                              <span className=" font-semibold ">Tenor</span>
                            </div>
                            <span className="font-semibold text-sm">
                              {detailData?.tenor} Bulan
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-gray-600">
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
                            <span className="text-gray-600">
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
                            <span className="text-gray-600">
                              {
                                detailData?.borrower?.performance?.repayment
                                  ?.onTime
                              }
                            </span>
                          </div>
                          <div className="flex justify-between gap-2">
                            <span className="flex items-center gap-2 font-semibold text-gray-700">
                              <BiTimer size={30} className=" text-gray-400" />
                              Terlambat
                            </span>
                            <span className="text-gray-600">
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
                  {/* Informasi Peminjam */}
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="col-span-1 ">
              <div className="sticky  top-[20px]">
                {/* Card Funding */}
                <div className="block p-5 bg-white border rounded-md shadow">
                  <span className="font-semibold text-darkBlue text-base">
                    Status Pendanaan
                  </span>
                  <div className="flex justify-between ">
                    {/* <p className="mt-2 hidden text-sm sm:block font-semibold">
                      Sisa Slot
                    </p>
                    <p className="mt-2 hidden text-sm sm:block">
                      {FormatMataUang(
                        detailData?.amount - detailData?.totalFunding
                      )}
                    </p> */}
                  </div>
                  <div className="flex justify-between">
                    <p className="mt-2 hidden text-sm sm:block font-semibold">
                      Terdanai
                    </p>
                    <p className="mt-2 hidden text-sm sm:block">
                      {FormatMataUang(detailData?.totalFunding)}
                    </p>
                  </div>
                  {/* Progress bar */}
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
                    disabled={progress === 100 ? true : false}
                    onClick={onClick}
                    type={"button"}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold !rounded-full w-full ${
                      progress === 100
                        ? "!bg-transparent text-white cursor-not-allowed border border-green-500 "
                        : ""
                    }`}
                  >
                    {progress === 100 ? (
                      <span className=" px-4 py-2 rounded text-green-600">
                        {" "}
                        Terdanai
                      </span>
                    ) : (
                      "Danai Sekarang"
                    )}
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
                contract={detailData?.contract}
                setModal={setOpenModalVerified}
              />
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
