import React, { useEffect, useState } from "react";

import { CardBalance } from "../../components/organism";
import { useDispatch, useSelector } from "react-redux";
import { getLenderProfit } from "../../service/lender/profit";
import { FormatMataUang } from "../../utils/FormatMataUang";
import { getRecommendLoan } from "../../service/loans/loan";
import CardPendanaan from "./CardPendanaan";
import { BiCoinStack, BiTransfer } from "react-icons/bi";
import { FaBalanceScale } from "react-icons/fa";
import LoanImg from "../../assets/img/loan/Group 1.svg";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "../../style/swipper.css";
import "swiper/css/pagination";

import { titleCase } from "../../utils/FormatTitleCase";
import { TruncateString } from "../../utils/Truncate";
import { Link } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";

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
        <div className="">
          <div className="mb-3">
            <span className="text-[17px] text-[#011419] font-semibold">
              Rekomendasi Pendanaan
            </span>
          </div>
          <div className="grid grid-cols-1 ">
            {loanList?.length > 0 ? (
              <div className="">
                <Swiper
                  autoplay={{
                    delay: 8000,
                  }}
                  pagination={true}
                  modules={[Autoplay, Pagination]}
                  className="mySwiper"
                >
                  {loanList.map((loan, index) => {
                    let progress = (loan.totalFunding / loan.amount) * 100;
                    return (
                      <SwiperSlide key={index} className="mb-2">
                        <Link
                          className="mb-2"
                          to={"/funder/pendanaan" + `/${loan.loanId}`}
                          key={index}
                        >
                          <div className="flex bg-white mb-6 p-3 lg:p-5 relative rounded">
                            <div className="absolute top-0 left-0 bg-[#4381cf] text-white  rounded-r-full px-2 py-1 ">
                              <span
                                className="transititext-primary  transition duration-100 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 font-semibold "
                                data-te-toggle="tooltip"
                                title={titleCase(loan.borrowingCategory)}
                              >
                                {TruncateString(
                                  titleCase(loan.borrowingCategory),
                                  20
                                )}
                              </span>
                            </div>
                            <div className="grow mt-4">
                              <div className="flex h-full ">
                                <div className="mt-4">
                                  <div className=" flex justify-center items-center h-12 w-12 rounded-full border-2  border-indigo-400 ">
                                    <BsPersonFill className="h-9 w-9 text-indigo-600" />
                                  </div>
                                </div>
                                <div className="text-left  ml-2 p-2">
                                  <h1 className="text-lg font-semibold text-[#303030]">
                                    {TruncateString(loan.borrower.name, 16)}
                                  </h1>
                                  <div className="flex flex-col items-start">
                                    <h1 className="text-xs pt-2 font-semibold text-[#303030]">
                                      Imbal hasil
                                    </h1>
                                    <h4 className="flex mt-2 items-center">
                                      <BiCoinStack className=" w-5 h-5 text-indigo-600 rounded mr-1" />
                                      <span className="text-base">
                                        {FormatMataUang(loan.yieldReturn)}
                                      </span>
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-3/4 p-4 mt-4">
                              <div>
                                <div className="grid grid-cols-6 font-lato">
                                  <div className="flex flex-col gap-2 col-span-2 ">
                                    <span className="text-xs text-gray-600 ">
                                      Jumlah Pinjaman
                                    </span>
                                    <span className="font-bold text-base text-gray-custom1 ">
                                      {FormatMataUang(loan.amount)}
                                    </span>
                                  </div>
                                  <div className="flex flex-col gap-2 col-span-2 ">
                                    <span className="text-xs text-gray-600 ">
                                      Skema Pelunasan
                                    </span>
                                    <span className=" text-sm text-grayCustom1 font-semibold">
                                      {loan.paymentSchema}
                                    </span>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <span className="text-xs text-gray-600 ">
                                      Tenor
                                    </span>
                                    <div className="font-semibold text-sm text-grayCustom1 ">
                                      <span>{loan.tenor} Bulan</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <span className="text-xs text-gray-600 ">
                                      Tujuan Peminjaman
                                    </span>
                                    <span className="font-semibold text-sm text-grayCustom1">
                                      {TruncateString(loan.purpose, 36)}
                                    </span>
                                  </div>
                                </div>
                                {/* Progress */}
                                <div className="mt-5">
                                  <span className="block text-xs mb-2 text-grayCustom1">
                                    Sisa Pendanaan:{" "}
                                    <span className="font-semibold	">
                                      {FormatMataUang(
                                        loan.amount - loan.totalFunding
                                      )}
                                    </span>
                                  </span>
                                  <span
                                    role="progressbar"
                                    aria-labelledby="ProgressLabel"
                                    className="block rounded-full bg-gray-200"
                                  >
                                    <span
                                      className="block h-4 rounded-full bg-green-500 text-center text-[10px]/4"
                                      style={{ width: `${progress}%` }}
                                    >
                                      <span className="font-bold text-white">
                                        {progress.toFixed(2)}%
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            ) : (
              <div className="min-h-[15rem] flex flex-col bg-white  shadow-md rounded-md ">
                <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                  <img src={LoanImg} alt="" />
                  <p className="mt-5 text-sm text-red-900 ">
                    Rekomendasi pendanaan sedang tidak ada
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Beranda;
