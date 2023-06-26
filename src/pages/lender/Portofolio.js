import React, { useEffect, useState } from "react";
import { handlePortofolio } from "../../service/lender/portofolio";
import { useDispatch, useSelector } from "react-redux";

// Icon
import { FaChartPie } from "react-icons/fa";

// Komponen
import CardPortofolio from "../../components/organism/cardPortofolio/CardPortofolio";
const Portofolio = () => {
  const [tab, setTab] = useState("active");
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handlePortofolio({ accessToken }));
  }, [dispatch, accessToken]);

  const portofolio = {
    active: {
      summary: {
        totalFunding: 120000,
        totalYield: 70000,
      },
      funding: [
        {
          funds: {
            amount: 500000,
            yieldReturn: 50000,
            repaymentDate: "2023-09-10T00:00:00.000Z",
          },
          Loan: {
            borrower: {
              name: "John Doe",
              creditScore: 500,
            },
            loan: {
              loanId: "tes",
              amount: 5000000,
              tenor: 5,
            },
          },
        },
        {
          funds: {
            amount: 1200000,
            yieldReturn: 40000,
            repaymentDate: "2023-10-10T00:00:00.000Z",
          },
          Loan: {
            borrower: {
              name: "The Undertaker",
              creditScore: 500,
            },
            loan: {
              loanId: "tes2",
              amount: 5000000,
              tenor: 2,
            },
          },
        },
      ],
    },
    done: {
      summary: {
        totalFunding: 5000000,
        totalYield: 200000,
      },
      funding: [
        {
          funds: {
            amount: 500000,
            yieldReturn: 50000,
            repaymentDate: "2023-08-10T00:00:00.000Z",
          },
          Loan: {
            borrower: {
              name: "Lionel Messi",
              creditScore: 500,
            },
            loan: {
              loanId: "640410c5465ed9af9ccb8912",
              amount: 5000000,
              tenor: 5,
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <div className="flex flex-col mb-4">
        <span className="font-semibold text-xl">Portofolio</span>
        <span>
          Total {portofolio.active.funding.length} berjalan,{" "}
          {portofolio.done.funding.length} selesai
        </span>
      </div>
      <div className="mb-4">
        <div className="flex border-b border-gray-100 text-sm ">
          <span
            className={`px-4 py-2  flex border-b  ${
              tab === "active"
                ? "-mb-px border-b-2 border-current p-4 text-indigo-500 font-semibold"
                : "  text-gray-400 hover:cursor-pointer hover:text-indigo-600"
            }`}
            onClick={() => setTab("active")}
          >
            Berjalan
          </span>
          <span
            className={`px-4 py-2 flex border-b  ${
              tab === "done"
                ? "-mb-px border-b-2 border-current p-4 text-indigo-500 font-semibold"
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
          {portofolio[tab].funding.map((item, index) => {
            const { name, creditScore } = item?.Loan?.borrower;
            const { repaymentDate, amount, yieldReturn } = item?.funds;
            const { tenor, loanId } = item?.Loan?.loan;
            return (
              <div className="mb-2.5" key={index}>
                <CardPortofolio
                  name={name}
                  creditScore={creditScore}
                  repaymentDate={repaymentDate}
                  amount={amount}
                  yieldReturn={yieldReturn}
                  tenor={tenor}
                  loanId={loanId}
                />
              </div>
            );
          })}
        </div>
        {/* Card Portofolio */}
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
                    {portofolio[tab].funding.length} Pendanaan
                    {tab === "active" ? " berjalan" : " selesai"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-center mt-2">
                  <div className="flex flex-col">
                    <span className="text-sm">Total Pendanaan</span>
                    <span className="font-semibold text-2xl">
                      {portofolio[tab].summary.totalFunding}
                    </span>
                  </div>
                </span>
                <span className=" text-center mt-2">
                  <div className="flex flex-col">
                    <span className="text-sm">Est.Imbal Hasil</span>
                    <span className="font-semibold text-2xl">
                      {" "}
                      {portofolio[tab].summary.totalYield}
                    </span>
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
