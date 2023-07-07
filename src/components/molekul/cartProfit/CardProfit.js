import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLenderProfit } from "../../../service/lender/profit";
import { useEffect } from "react";
import { FormatMataUang } from "../../../utils/FormatMataUang";
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";

const CardProfit = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const { profit } = useSelector((state) => state.lender);

  const profitLender = () => {
    dispatch(getLenderProfit({ accessToken }));
  };

  useEffect(() => {
    profitLender();
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3">
      <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
        <div>
          <div className="flex  items-center gap-3 text-green-600">
            <MdOutlineTrendingUp />
            <strong className="block text-sm font-medium ">
              Keuntungan imbal hasil
            </strong>
          </div>

          <p className="p-1 text-green-600">
            <span className="text-2xl font-medium">
              {FormatMataUang(profit?.totalFunding)}
            </span>
          </p>
        </div>
      </article>

      <article className="flex flex-col gap-1 rounded-lg border border-gray-100 bg-white p-6">
        <div>
          <div className="flex  items-center gap-3 text-red-600">
            <MdOutlineTrendingDown />
            <strong className="block text-sm font-medium ">
              Dana yang disalurkan
            </strong>
          </div>
          <p className=" p-1 text-red-600">
            <span className="text-2xl font-medium ">
              {FormatMataUang(profit?.totalYield)}
            </span>
          </p>
        </div>
      </article>
    </div>
  );
};

export default CardProfit;
