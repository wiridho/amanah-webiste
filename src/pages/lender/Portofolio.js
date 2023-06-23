import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { handlePortofolio } from "../../service/lender/portofolio";
import { useDispatch, useSelector } from "react-redux";

// Icon
import { HiChartPie } from "react-icons/hi";
import { FaChartPie, FaFilePdf } from "react-icons/fa";
import { titleCase } from "../../utils/FormatTitleCase";
import { Link } from "react-router-dom";
import { Badge } from "../../components/atom";
const Portofolio = () => {
  const [tab, setTab] = useState("berjalan");
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handlePortofolio({ accessToken }));
  }, []);

  return (
    <div>
      <div className="flex flex-col mb-4">
        <span className="font-semibold text-xl">Portofolio</span>
        <span>Total 0 berjalan, 0 selesai</span>
      </div>
      <div className="mb-4">
        <div className="flex border-b border-gray-100 text-sm ">
          <span
            className={`px-4 py-2  flex border-b  ${
              tab === "berjalan"
                ? "-mb-px border-b-2 border-current p-4 text-indigo-500 font-semibold"
                : "  text-gray-400 hover:cursor-pointer hover:text-indigo-600"
            }`}
            onClick={() => setTab("berjalan")}
          >
            Berjalan
          </span>
          <span
            className={`px-4 py-2 flex border-b  ${
              tab === "selesai"
                ? "-mb-px border-b-2 border-current p-4 text-indigo-500 font-semibold"
                : " text-gray-400 hover:text-indigo-700 hover:cursor-pointer "
            }`}
            onClick={() => setTab("selesai")}
          >
            Selesai
          </span>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-14">
        <div className="col-span-3">
          <Link
            to="#"
            className="relative block overflow-hidden shadow  rounded-md bg-white border border-gray-100 p-4 sm:p-6 lg:p-6"
          >
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 via-indigo-700 to-indigo-900"></span>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#194175] sm:text-xl ">
                John Cena
              </h3>
              <span>
                <Badge className={"border border-indigo-600  text-indigo-500"}>
                  500
                </Badge>
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-">
              <div className="flex justify-between">
                <span className="text-base text-[#194175] font-medium">
                  Pendanaanmu
                </span>
                <span className="font-mono font-semibold text-gray-700">
                  Rp500.000
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-gray-800">
                  Estimasi Imbal Hasil
                </span>
                <span className="font-semibold  font-mono text-gray-700">
                  Rp20.000
                </span>
              </div>
            </div>

            <dl className="mt-6 flex gap-4 sm:gap-6 justify-between">
              <div className="flex justify-between gap-7">
                <div className="flex flex-col">
                  <dt className="text-xs  text-gray-500">Tanggal Pelunasan</dt>
                  <dd className="text-sm text-gray-700 font-medium">
                    04 April 2023
                  </dd>
                </div>

                <div className="flex flex-col">
                  <dd className="text-xs text-gray-500">Tenor</dd>
                  <dt className="text-sm font-medium text-gray-600">5 bulan</dt>
                </div>
              </div>
              <div className="">
                <a
                  class="flex items-center gap-1  border border-indigo-800 bg-indigo-800 px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                  href="/download"
                >
                  <FaFilePdf color="text-indigo-600" size={18} />
                  Kontrak
                </a>
              </div>
            </dl>
          </Link>
        </div>
        {/* Summary / Ringkasan */}
        <div className="col-span-2">
          <div className="bg-gradient-to-b from-[#003b65] to-[#004c7f] shadow-lg rounded-md text-white">
            <div className="py-6">
              <div className="mb-2 flex items-center gap-2 justify-center">
                <span className="text-xl">
                  <FaChartPie size={19} />
                </span>
                <div>
                  <span>Ringkasan </span>
                  <span className="font-semibold">
                    1 Pendanaan {titleCase(tab)}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-center mt-2">
                  <div className="flex flex-col">
                    <span className="text-sm">Total Pendanaan</span>
                    <span className="font-semibold text-2xl">2.000.000</span>
                  </div>
                </span>
                <span className=" text-center mt-2">
                  <div className="flex flex-col">
                    <span className="text-sm">Est.Imbal Hasil</span>
                    <span className="font-semibold text-2xl">200.000</span>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Summary / Ringkasan */}
      </div>
    </div>
  );
};

export default Portofolio;
