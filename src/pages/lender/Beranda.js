import React, { useEffect, useState } from "react";

import { CardBalance } from "../../components/organism";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";
import { getLenderProfit } from "../../service/lender/profit";
import { FormatMataUang } from "../../utils/FormatMataUang";
import { getRecommendLoan } from "../../service/loans/loan";
import CardPendanaan from "./CardPendanaan";
import { BsDatabase } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { FaBalanceScale } from "react-icons/fa";

const Beranda = () => {
  const [loanList, setListLoan] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);
  const { profit } = useSelector((state) => state.lender);
  const dispatch = useDispatch();

  const profitLender = () => {
    dispatch(getLenderProfit({ accessToken }));
  };

  useEffect(() => {
    profitLender();
    getRecommend();
  }, []);

  const getRecommend = async () => {
    const response = await getRecommendLoan({
      accessToken,
    });
    console.log(response);
    setListLoan(response?.data);
  };

  return (
    <>
      <div className="font-nunito-sans">
        <div>
          <CardBalance />
        </div>
        {/* Keuntungan Imbal Hasil */}
        <div className="my-6">
          <div className="mb-3">
            <span className="text-[17px] text-[#011419] font-semibold">
              Ringkasan Pendanaanmu
            </span>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-1 shadow-md rounded-md">
              <div className="flex items-center relative justify-between py-5 px-7 bg-green-100 font-medium text-green-800 rounded-md">
                <div className="bg-green-200 z-10 right-0 absolute w-32 h-full rounded-s-full"></div>
                <div className="flex flex-col z-20">
                  <span className="mb-2">Keuntungan Imbal Hasil</span>
                  <div className="flex items-center gap-2 text-4xl font-semibold">
                    <span>{FormatMataUang(profit?.totalYield)}</span>
                  </div>
                </div>
                <div className=" z-20">
                  <FaBalanceScale size={60} />
                </div>
              </div>
            </div>
            {/* Dana yang disalurkan  */}
            <div className="col-span-1 shadow-md rounded-md ">
              <div className="flex items-center relative justify-between py-5 px-7 bg-yellow-100 font-medium text-yellow-800 rounded-md">
                <div className="bg-yellow-200 z-10 right-0 absolute w-32 h-full rounded-s-full"></div>
                <div className="flex flex-col z-20">
                  <span className="mb-2">Dana yang disalurkan</span>
                  <div className="flex items-center gap-2 text-4xl font-semibold">
                    <span>{FormatMataUang(profit?.totalFunding)}</span>
                  </div>
                </div>
                <div className=" z-20">
                  <BiTransfer size={60} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Rekomendasi Pendanaan */}
        <div className="flex flex-col gap-3">
          <span className="text-[17px] text-[#011419] font-semibold">
            Rekomendasi Pendanaan
          </span>
          <div>
            {loanList?.length > 0 ? (
              <CardPendanaan to={"/pendanaan"} data={loanList} />
            ) : (
              "ga ada rekomendasi"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Beranda;
