import React, { useEffect, useState } from "react";
import { getLenderFunding } from "../../service/lender/portofolio";
import { useDispatch, useSelector } from "react-redux";

// Icon
import { FaChartPie } from "react-icons/fa";

import CardPortofolio from "../../components/organism/cardPortofolio/CardPortofolio";
import { FormatMataUang } from "../../utils/FormatMataUang";
import { Loading } from "../../components/atom";
const Portofolio = () => {
  const [tab, setTab] = useState("active");
  const { accessToken } = useSelector((state) => state.auth);
  const { portofolio, load } = useSelector((state) => state.lender);
  const dispatch = useDispatch();

  const portoLengthBerjalan = portofolio?.["active"]?.funding.length;
  const portoLengthSelesai = portofolio?.["done"]?.funding.length;

  useEffect(() => {
    dispatch(getLenderFunding({ accessToken }));
  }, [dispatch, accessToken]);

  console.log(portofolio);

  return (
    <div className="font-nunito-sans">
      {load ? (
        <span>
          <Loading /> Loading
        </span>
      ) : (
        <>
          <div className="flex flex-col mb-4">
            <span className="font-semibold text-xl">Portofolio</span>
            <span>
              Total {portoLengthBerjalan || 0} berjalan,{" "}
              {portoLengthSelesai || 0} selesai
            </span>
          </div>
          <div className="mb-4">
            <div className="flex border-b border-gray-100 text-sm ">
              <span
                className={`px-4 py-2  flex border-b  ${
                  tab === "active"
                    ? "-mb-px border-b-2 border-current p-4 text-indigo-500 font-bold"
                    : "  text-gray-400 hover:cursor-pointer hover:text-indigo-600 "
                }`}
                onClick={() => setTab("active")}
              >
                Berjalan
              </span>
              <span
                className={`px-4 py-2 flex border-b  ${
                  tab === "done"
                    ? "-mb-px border-b-2 border-current p-4 text-indigo-500 font-bold"
                    : " text-gray-400 hover:text-indigo-700 hover:cursor-pointer "
                }`}
                onClick={() => setTab("done")}
              >
                Selesai
              </span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-14">
            {/* Card Portofolio */}
            <div className="col-span-3">
              {portofolio?.[tab]?.funding?.map((item, index) => {
                const { name, creditScore } = item?.Loan?.borrower;
                const { repaymentDate, amount, yieldReturn, createdDate } =
                  item?.funds;
                const { tenor, loanId, contract } = item?.Loan?.loan;
                return (
                  <div className="mb-5" key={index}>
                    <div>
                      <CardPortofolio
                        contract={contract}
                        name={name}
                        creditScore={creditScore}
                        repaymentDate={repaymentDate}
                        amount={amount}
                        yieldReturn={yieldReturn}
                        tenor={tenor}
                        loanId={loanId}
                        createdDate={createdDate}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Summary / Ringkasan */}
            <div className="col-span-2">
              <div className="bg-gradient-to-b from-[#003b65] to-[#004c7f] shadow-lg rounded-md text-white sticky  top-[20px]">
                <div className="py-6">
                  <div className="mb-2 flex items-center gap-2 justify-center">
                    <span className="text-xl">
                      <FaChartPie size={19} />
                    </span>
                    <div>
                      <span>Ringkasan </span>
                      <span className="font-semibold">
                        {portofolio?.[tab]?.funding?.length || 0} Pendanaan
                        {tab === "active" ? " berjalan" : " selesai"}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-center mt-2">
                      <div className="flex flex-col">
                        <span className="text-sm">Total Pendanaan</span>
                        <span className="font-semibold text-2xl">
                          {FormatMataUang(
                            portofolio?.[tab]?.summary?.totalFunding
                          ) || 0}
                        </span>
                      </div>
                    </span>
                    <span className=" text-center mt-2">
                      <div className="flex flex-col">
                        <span className="text-sm">Total Imbal Hasil</span>
                        <span className="font-semibold text-2xl">
                          {FormatMataUang(
                            portofolio?.[tab]?.summary?.totalYield
                          ) || 0}
                        </span>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Portofolio;
