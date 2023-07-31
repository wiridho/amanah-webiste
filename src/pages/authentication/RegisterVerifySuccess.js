import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resendRegisterVerify } from "../../service/authentication/authService";
import { BsCheck2, BsFillCheckCircleFill } from "react-icons/bs";
import { Button } from "../../components/atom";

const RegisterVerifySucess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.auth);

  const email = data.email;
  const userId = data.userId;

  const handleResend = () => {
    console.log(userId);
    console.log("resend click");
    dispatch(resendRegisterVerify(userId));
  };

  return (
    <>
      <div className="container mx-auto font-nunito-sans ">
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-[35rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            {/* Grid */}
            {/* Card */}
            <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-md rounded-xl ">
              <div className="h-52 flex flex-col justify-center items-center bg-green-400 rounded-t-xl">
                <BsFillCheckCircleFill size={100} className="text-white" />
              </div>
              <div className="flex flex-col gap-5 p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Registrasi Berhasil
                </h3>
                <p className=" text-gray-500 ">
                  Terima kasih kami telah mengirim link verifikasi ke email{" "}
                  <span className="font-semibold text-green-800">
                    {email},{" "}
                  </span>{" "}
                  Silahkan cek inbox anda untuk verifikasi email akun kamu.
                </p>
                <div className=" flex gap-2">
                  <span className="text-gray-500">Belum menerima email? </span>
                  <button
                    className="underline text-indigo-800 font-semibold"
                    onClick={handleResend}
                  >
                    Kirim ulang!
                  </button>
                </div>
              </div>
            </div>
            {/* End Grid */}
          </div>
          {/* <div className="w-1/3">
            <div className=" p-5 bg-green-400 border  rounded-xl ">
              <div className="flex justify-center">
                <div className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full">
                  <BsCheck2 className="w-8 h-8 stroke-[2px] text-white text-center" />
                </div>
              </div>
              <div className="mb-8">
                <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-slate-800 ">
                  Registration Success
                </h5>
              </div>
              <div className="bg-green-50 rounded p-3">
                <p className="mb-3  text-green-800  font-normal">
                  Terima kasih, kami telah mengirim link verifikasi ke email
                  <strong> {email}.</strong>
                  Silahkan cek inbox anda untuk verifikasi email akun kamu.
                </p>
              </div>
              <div className="mt-3">
                <span className="text-gray-500">Belum menerima email? </span>
                <button
                  className="underline text-indigo-800 font-semibold"
                  onClick={handleResend}
                >
                  {" "}
                  Kirim ulang!
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default RegisterVerifySucess;
