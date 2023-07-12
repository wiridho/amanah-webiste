import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLenderStatusKYC } from "../../../service/lender/lenderVerificationKYC";
import { setStatusKYC } from "../../../store/reducer/AuthReducer";
import { Link } from "react-router-dom";
import SuccessGif from "../../../assets/img/success/success_gif2.gif";
import WarnigGif from "../../../assets/img/success/warning2.gif";

const Status_KYC = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const statusKYC = "verified";
  console.log("statusKYC", statusKYC);

  // const getStatusKYC = async () => {
  //   try {
  //     const response = await getLenderStatusKYC({ accessToken });
  //     dispatch(setStatusKYC(response?.data?.kyc));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getStatusKYC();
  // }, []);

  if (statusKYC === "pending") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="group flex flex-col w-full sm:w-2/6  bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="h-52 flex flex-col justify-center items-center bg-yellow-100  rounded-t-xl relative">
            <img
              src={WarnigGif}
              alt=""
              className="w-1/2 overflow-hidden object-cover"
            />
          </div>
          <div className="p-4 md:px-6 md:py-4">
            <span className="block mb-1 text-xs font-semibold uppercase text-blue-600"></span>
            <h3 className="text-xl font-semibold text-gray-800">
              Status KYC sedang diproses
            </h3>
            <p className="mt-3 text-gray-500">
              Proses verifikasi KYC Anda{" "}
              <span className="font-semibold"> sedang diproses</span> Mohon
              ditunggu hingga status KYC Anda disetujui oleh admin, Terima kasih
              atas kesabaran Anda.
            </p>
          </div>
          <div className="mt-auto flex border-t border-gray-200 px-4 md:px-6 py-3 ">
            <Link to={"/funder"} className="text-blue-500 hover:text-blue-700">
              Kembali ke halaman utama{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (statusKYC === "verified") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="group flex flex-col w-full sm:w-2/6  bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="h-52 flex flex-col justify-center items-center  rounded-t-xl relative">
            <img
              src={SuccessGif}
              alt=""
              className="w-full overflow-hidden object-cover"
            />
          </div>
          <div className="p-4 md:px-6 md:py-4">
            <span className="block mb-1 text-xs font-semibold uppercase text-blue-600"></span>
            <h3 className="text-xl font-semibold text-gray-800">
              Status KYC Diverfikasi
            </h3>
            <p className="mt-3 text-gray-500">
              Proses verifikasi KYC Anda telah{" "}
              <span className="font-semibold"> berhasil</span> dan mendapat
              persetujuan. Selanjutnya, Anda dapat melakukan transaksi yang
              tersedia di platform kami.
            </p>
          </div>
          <div className="mt-auto flex border-t border-gray-200 px-4 md:px-6 py-3 ">
            <Link to={"/funder"} className="text-blue-500 hover:text-blue-700">
              Kembali ke halaman utama{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <span>status kyc kamu : {statusKYC}</span>
    </div>
  );
};

export default Status_KYC;
