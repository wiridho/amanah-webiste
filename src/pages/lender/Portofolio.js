import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { handlePortofolio } from "../../service/lender/portofolio";
import { useDispatch, useSelector } from "react-redux";

// Icon
import { HiChartPie } from "react-icons/hi";
import { FaChartPie } from "react-icons/fa";
import { titleCase } from "../../utils/FormatTitleCase";
import { Link } from "react-router-dom";
const Portofolio = () => {
  const [tab, setTab] = useState("berjalan");
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(handlePortofolio({ accessToken }));
  // }, []);

  useEffect(() => {}, []);

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
                ? "-mb-px border-b border-current p-4 text-indigo-500 font-semibold"
                : "  text-gray-400 hover:cursor-pointer hover:text-indigo-600"
            }`}
            onClick={() => setTab("berjalan")}
          >
            Berjalan
          </span>
          <span
            className={`px-4 py-2 flex border-b  ${
              tab === "selesai"
                ? "-mb-px border-b border-current p-4 text-indigo-500 font-semibold"
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
            className="relative block overflow-hidden rounded-lg bg-white border border-gray-100 p-4 sm:p-6 lg:p-8"
          >
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 to-blue-500"></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  <span>{}</span>
                  John Cena
                </h3>

                <p className="mt-1 text-xs font-medium text-gray-600">
                  By John Doe
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="max-w-[40ch] text-sm text-gray-500">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                velit illum provident a, ipsa maiores deleniti consectetur nobis
                et eaque.
              </p>
            </div>

            <dl className="mt-6 flex gap-4 sm:gap-6">
              <div className="flex flex-col-reverse">
                <dt className="text-sm font-medium text-gray-600">Published</dt>
                <dd className="text-xs text-gray-500">31st June, 2021</dd>
              </div>

              <div className="flex flex-col-reverse">
                <dt className="text-sm font-medium text-gray-600">
                  Reading time
                </dt>
                <dd className="text-xs text-gray-500">3 minute</dd>
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
