import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getDetailLoan } from "../../service/loans/loan";

//Import Component
import { Button } from "../../components/atom";

// Icon
import { HiOutlineChevronRight, HiOutlineHome } from "react-icons/hi";
import { FaFilePdf, FaMoneyBillWave } from "react-icons/fa";
import { FormatMataUang } from "../../utils/FormatMataUang";
import { GiPayMoney } from "react-icons/gi";
import { GoNote } from "react-icons/go";

const DetailPendanaan = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const { accessToken, statusKYC } = useSelector((state) => state.auth);

  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getDetailLoan({ accessToken, loanId });
      setDetailData(response?.data);
    })();
  }, []);

  let progress = (detailData?.totalFunding / detailData?.amount) * 100;

  const onClick = () => {
    if (statusKYC === "verified") {
      navigate(`funder/pendanaan/transaksi/${loanId}`);
    } else {
      console.log("Belum Verified");
    }
  };

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
              to={"#"}
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

              {/* Keterangan Funding */}
              <div>
                <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col gap-2">
                      <div>
                        <div className="flex items-center gap-3">
                          <FaMoneyBillWave />
                          <span className="text-sm font-medium text-neutral-600">
                            Jumlah Pembiayaan
                          </span>
                        </div>
                        <span className="font-bold">
                          {FormatMataUang(detailData?.amount)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <GiPayMoney />
                          <span className="text-sm font-semibold text-neutral-600">
                            Skema Pengembalian
                          </span>
                        </div>
                        <span className="font-semibold text-neutral-600">
                          {detailData?.paymentSchema}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <GoNote />
                          <span className="text-sm font-semibold text-neutral-600">
                            Tujuan Penggunaan Dana
                          </span>
                        </div>
                        <span className="font-semibold text-neutral-600">
                          {detailData?.purpose}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              {/* Card Funding */}
              <div className="relative justify-between rounded-xl border bg-white px-5 py-2.5 mt-4">
                <div className="">
                  <h3 className="mt-4 text-sm font-semibold ">
                    Status Pendanaan
                  </h3>

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
                          {progress} %
                        </span>
                      </span>
                    </span>
                  </div>

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
        </div>
      </div>
    </div>
  );
};

export default DetailPendanaan;
