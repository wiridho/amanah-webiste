import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { getDetailLoan } from "../../service/loans/loan";

// Icon
import { HiOutlineChevronRight, HiOutlineHome } from "react-icons/hi";
import { FaFilePdf, FaMoneyBillWave } from "react-icons/fa";
import { FormatMataUang } from "../../utils/FormatMataUang";

const DetailPendanaan = () => {
  const { loanId } = useParams();
  const { accessToken } = useSelector((state) => state.auth);

  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getDetailLoan({ accessToken, loanId });
      setDetailData(response?.data);
    })();
  }, []);

  console.log("detail", detailData);
  return (
    <div className="">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-gray-600">
          <li>
            <Link to="beranda" className="block transition hover:text-gray-700">
              <span className="sr-only"> Beranda </span>
              <HiOutlineHome className="h-4 w-4" />
            </Link>
          </li>

          <li className="rtl:rotate-180">
            <HiOutlineChevronRight className="h-4 w-4" />
          </li>

          <li>
            <Link
              to={"/funder/pendanaan"}
              className="block transition hover:text-gray-700"
            >
              Pendanaan
            </Link>
          </li>

          <li className="rtl:rotate-180">
            <HiOutlineChevronRight className="h-4 w-4" />
          </li>

          <li>
            <Link
              to={`funder/pendanaan/${loanId}`}
              className="block transition hover:text-gray-700 font-bold"
            >
              Detail Pendanaan
            </Link>
          </li>
        </ol>
      </nav>

      <div className="relative mx-auto ">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 p-8">
            <div className="p-2">
              <div className="">
                <span>Detail Payor & Penerima Pembiayaan</span>
              </div>
              <div className="flex flex-col gap-3">
                {/* Kontrak */}
                <div className="block rounded-xl border bg-white shadow sm:p-3 lg:p-3">
                  <div className="flex items-center justify-between gap-2 px-2">
                    <div className="flex items-center gap-3">
                      <FaFilePdf className="text-gray-500 w-8 h-8" />
                      <p className="text-md font-semibold text-gray-700">
                        Kontrak pembiayaan
                      </p>
                    </div>
                    <a
                      target="_blank"
                      href={detailData?.contract}
                      className="underline font-semibold text-blue-800 hover:text-blue-950"
                    >
                      Lihat
                    </a>
                  </div>
                </div>
                {/* Kontrak */}
              </div>
            </div>
          </div>

          <div className="col-span-1 sticky top-0">
            <div className="sticky top-0">
              <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
                {detailData?.risk}
              </strong>
              <div>
                <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                  <div className="p-4 sm:p-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <FaMoneyBillWave />
                        <span className="text-sm font-medium text-neutral-600">
                          Jumlah Pembiayaan
                        </span>
                      </div>
                      <span className="font-semibold">
                        {FormatMataUang(detailData?.amount)}
                      </span>
                      <div className="flex items-center gap-3">
                        <FaMoneyBillWave />
                        <span className="text-sm font-medium text-neutral-600">
                          Skema Pengembalian
                        </span>
                      </div>
                      <span className="">{detailData?.paymentSchema}</span>
                      <div className="flex items-center gap-3">
                        <FaMoneyBillWave />
                        <span className="text-sm font-medium text-neutral-600">
                          Tujuan Penggunaan Dana
                        </span>
                      </div>
                      <span className="">{detailData?.purpose}</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPendanaan;
