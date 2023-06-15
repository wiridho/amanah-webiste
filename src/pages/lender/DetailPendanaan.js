import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { getDetailLoan } from "../../service/loans/loan";

// Icon
import { HiOutlineChevronRight, HiOutlineHome } from "react-icons/hi";
import { FaFilePdf } from "react-icons/fa";

const DetailPendanaan = () => {
  const [detail, setDetailData] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);

  const { loanId } = useParams();

  useEffect(() => {
    (async () => {
      const response = await getDetailLoan({ accessToken, loanId });
      setDetailData(response?.data);
    })();
  }, []);

  console.log("detail", detail);
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
                <div className="block rounded-xl border bg-white shadow sm:p-3 lg:p-3">
                  <div className="flex items-center justify-between gap-2 px-2">
                    <div className="flex items-center gap-3">
                      <FaFilePdf className="text-gray-500 w-8 h-8" />
                      <p className="text-md font-semibold text-gray-700">
                        Kontrak pembiayaan
                      </p>
                    </div>
                    <Link
                      to={"#"}
                      className="underline font-semibold text-blue-800 hover:text-blue-950"
                    >
                      Lihat
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 sticky top-0">
            <div class="sticky top-0">
              <strong class="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
                Pre Order
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPendanaan;
