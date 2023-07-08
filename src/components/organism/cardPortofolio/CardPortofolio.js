import React from "react";
import moment from "moment/moment";
import { FaFilePdf } from "react-icons/fa";
import { Badge } from "../../atom";
import { Link } from "react-router-dom";
import { titleCase } from "../../../utils/FormatTitleCase";
import { FormatMataUang } from "../../../utils/FormatMataUang";

const CardPortofolio = ({
  name,
  creditScore,
  amount,
  yieldReturn,
  repaymentDate,
  tenor,
  loanId,
}) => {
  return (
    <div>
      <Link
        to={`/funder/pendanaan/${loanId}`}
        className="relative block overflow-hidden shadow-md  rounded-md bg-white border border-gray-100 p-4 sm:p-6 lg:p-6"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 via-indigo-700 to-indigo-900"></span>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#194175] sm:text-xl ">
            {titleCase(name)}
          </h3>
          <span>
            <Badge className={"border border-indigo-600  text-indigo-500"}>
              {creditScore}
            </Badge>
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-base text-[#194175] font-medium">
              Pendanaanmu
            </span>
            <span className="font-mono font-semibold text-gray-700">
              {FormatMataUang(amount)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-base text-gray-800">
              Estimasi Imbal Hasil
            </span>
            <span className="font-semibold  font-mono text-gray-700">
              {FormatMataUang(yieldReturn)}
            </span>
          </div>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6 justify-between">
          <div className="flex justify-between gap-7">
            <div className="flex flex-col">
              <dt className="text-xs  text-gray-500">Tanggal Pelunasan</dt>
              <dd className="text-sm text-gray-700 font-medium">
                {moment(repaymentDate).format("DD MMM YYYY")}
              </dd>
            </div>

            <div className="flex flex-col">
              <dd className="text-xs text-gray-500">Tenor</dd>
              <dt className="text-sm font-medium text-gray-600">{tenor}</dt>
            </div>
          </div>
          <div className="">
            <a
              className="flex items-center gap-1  border border-indigo-800 bg-indigo-800 px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              href="/download"
            >
              <FaFilePdf color="text-indigo-600" size={18} />
              Kontrak
            </a>
          </div>
        </dl>
      </Link>
    </div>
  );
};

export default CardPortofolio;
