import React, { useEffect, useState } from "react";

import { CardBalance } from "../../components/organism";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";
import { getLenderProfit } from "../../service/lender/profit";
import { FormatMataUang } from "../../utils/FormatMataUang";

const Beranda = () => {
  const [visible, setVisible] = useState(false);
  const { accessToken, statusKYC } = useSelector((state) => state.auth);
  const { profit } = useSelector((state) => state.lender);
  const dispatch = useDispatch();

  const profitLender = () => {
    dispatch(getLenderProfit({ accessToken }));
  };

  useEffect(() => {
    profitLender();
  }, []);

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
              Ringkasan Pendaanmu
            </span>
          </div>
          <div className="grid  gap-8">
            <div className="col-span-1 shadow-md rounded-md">
              <article className="flex flex-col gap-4 rounded-lg  bg-green-50 p-6">
                <div>
                  <div className="flex  items-center gap-3 text-green-500">
                    <MdOutlineTrendingUp size={20} />
                    <strong className="block text-sm font-medium ">
                      Keuntungan imbal hasil
                    </strong>
                  </div>
                  <p className="p-1 text-green-500">
                    <span className="text-2xl font-medium">
                      {FormatMataUang(profit?.totalYield)}
                    </span>
                  </p>
                </div>
              </article>
            </div>
            {/* Dana yang disalurkan  */}
            <div className="col-span-1 shadow-md rounded-md">
              <article className="flex flex-col gap-1 rounded-lg  bg-yellow-50 p-6">
                <div>
                  <div className="flex  items-center gap-3 text-yellow-600">
                    <MdOutlineTrendingDown size={20} />
                    <strong className="block text-sm font-medium ">
                      Dana yang disalurkan
                    </strong>
                  </div>
                  <p className=" p-1 text-yellow-600">
                    <span className="text-2xl font-medium ">
                      {FormatMataUang(profit?.totalFunding)}
                    </span>
                  </p>
                </div>
              </article>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Beranda;
