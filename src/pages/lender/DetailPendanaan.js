import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getDetailLoan } from "../../service/loans/loan";

// Utils
import { TruncateString } from "../../utils/Truncate";
import { titleCase } from "../../utils/FormatTitleCase";

//Import Component
import { Button } from "../../components/atom";

// Icon
import {
  HiClipboardCheck,
  HiOutlineCash,
  HiOutlineCreditCard,
  HiOutlineFastForward,
  HiOutlineHome,
} from "react-icons/hi";
import { FaFilePdf, FaMoneyBillWave } from "react-icons/fa";
import { FormatMataUang } from "../../utils/FormatMataUang";
import { GiPayMoney } from "react-icons/gi";
import { GoNote } from "react-icons/go";
import { BsPersonFill } from "react-icons/bs";
import { BiCategoryAlt, BiCoinStack, BiTimer } from "react-icons/bi";
import { MdOutlineSentimentSatisfied } from "react-icons/md";

import BreadCumb from "../../components/atom/breadcumb/BreadCumb";
import TransaksiPendanaan from "./Pendanaan/TransaksiPendanaan";

const DetailPendanaan = () => {
  const [openModalVerified, setOpenModalVerified] = useState(false);
  const [openModalPending, setOpenModalPending] = useState(false);
  const [openModalNotVerified, setOpenModalNotVerified] = useState(false);

  const { accessToken } = useSelector((state) => state.auth);
  const { loanId } = useParams();
  const [detailData, setDetailData] = useState(null);
  let progress = (detailData?.totalFunding / detailData?.amount) * 100;

  const navigate = useNavigate();
  const statusKYC = "verified";
  useEffect(() => {
    (async () => {
      const response = await getDetailLoan({ accessToken, loanId });
      setDetailData(response?.data);
    })();
  }, []);

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

  // const statusKYC = "verified";
  const performanceBorrower = detailData?.borrower?.performance;

  return (
    <div className="">
      <BreadCumb links={breadCumbLinks} />
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <div className="my-6">
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
                      Personal
                      {/* {TruncateString(titleCase(item.borrowingCategory), 20)} */}
                    </span>
                  </div>
                  <div className="flex  flex-col  gap-3 px-6 py-4">
                    <div className="flex items-center gap-4">
                      <BsPersonFill className="text-4xl text-gray-500" />
                      <span className="text-lg font-semibold text-[#303030]">
                        John Cena
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 ">
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">
                          Total dana dipinjam
                        </span>
                        <span className="font-semibold">1 pinjaman </span>
                      </div>
                      <div className="flex flex-col ">
                        <span className="text-gray-500 text-sm">
                          Total peminjaman
                        </span>
                        <span className="font-semibold">1 pinjaman </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">
                          Kredit Skor
                        </span>
                        <span className="font-semibold">2.4</span>
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
                          <span className="font-medium">Jumlah Pembiayaan</span>
                        </div>
                        <span className="font-bold">
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
                  <span className="inline-block font-semibold text-sm mb-2">
                    Performa Penerima Pendanaan
                  </span>
                  <div className="rounded bg-white overflow-hidden shadow flex flex-col px-6 py-4">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <span className="font-bold">
                          Track Record Pembiayaan
                        </span>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between">
                            <span className="">Dana Tersalurkan</span>
                            <span>Rp2.000.000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="">Pembiayaan Tersalurkan</span>
                            <span>Rp4.000.000</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="font-bold">
                          Performa Pengembalian Dana
                        </span>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between">
                            <span className="flex items-center gap-2">
                              <HiOutlineFastForward
                                size={30}
                                className="text-gray-400"
                              />
                              Dipercepat
                            </span>
                            <span>0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="flex items-center gap-2">
                              <MdOutlineSentimentSatisfied
                                size={30}
                                className=" text-gray-400"
                              />
                              Tepat waktu
                            </span>
                            <span>0</span>
                          </div>
                          <div className="flex justify-between gap-2">
                            <span className="flex items-center gap-2">
                              <BiTimer size={30} className=" text-gray-400" />
                              Terlambat
                            </span>
                            <span>0</span>
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

        <div className="col-span-1 sticky top-0">
          <div className="sticky top-0">
            {/* <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
            </strong> */}

            {/* Card Funding */}
            <div className="block px-6 py-4 bg-white border border-gray-200 rounded-lg shadow">
              <h3 className=" text-sm font-semibold ">Status Pendanaan</h3>
              <div className="flex justify-between ">
                <p className="mt-2 hidden text-sm sm:block">Sisa Slot</p>
                <p className="mt-2 hidden text-sm sm:block">
                  {FormatMataUang(
                    detailData?.amount - detailData?.totalFunding
                  )}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="mt-2 hidden text-sm sm:block">Terdanai</p>
                <p className="mt-2 hidden text-sm sm:block">
                  {FormatMataUang(detailData?.totalFunding)}
                </p>
              </div>
              {/* Progress */}
              <div className="my-3">
                <span id="ProgressLabel" className="sr-only">
                  Loading
                </span>

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
                  "bg-indigo-500 hover:bg-indigo-700 !rounded-full text-white font-semibold w-full"
                }
              >
                Danai Sekarang
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`z-10 fixed flex items-center justify-center inset-0 backdrop-brightness-50 transition-opacity ${
          openModalVerified ? "" : "hidden"
        }`}
      >
        <div className="bg-white flex flex-col gap-4">
          <TransaksiPendanaan />
          <div className="flex items-center  justify-end  ">
            <button
              onClick={() => setOpenModalVerified(false)}
              className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
      <div
        className={`z-10 fixed flex items-center justify-center transition-transform duration-1000 inset-0 backdrop-brightness-50     ${
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
                Mohon tunggu, kami akan infokan ketika peninjauan telah selesai{" "}
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
  );
};

export default DetailPendanaan;
