import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InputLabel } from "../../components/molekul";
import LogoAmana from "../../assets/img/logo/LogoAmana2.svg";
import { Button, Message, Loading } from "../../components/atom";
import { forgotPassRequest } from "../../service/authentication/authService";
import { setMessage } from "../../store/reducer/AuthReducer";

const ForgotPasswordRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, load, success } = useSelector((state) => state.auth);

  // Calling useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data["platform"] = "website";
    dispatch(
      forgotPassRequest({
        data,
      })
    );
  };

  useEffect(() => {
    dispatch(setMessage(null));
  }, [location.pathname]);

  return (
    <>
      <div className="h-screen grid grid-cols-1 sm:grid-cols-2 overflow-hidden font-nunito-sans">
        {/* Left Wrapper */}
        <div className="hidden bg-primary md:flex sm:block items-center relative">
          <div className="absolute bg-blue-600 opacity-100 h-screen w-full z-20 "></div>
          <span className="px-16 leading-[70px] text-white text-5xl z-50">
            Investasi{" "}
            <span className="font-bold font-inter">Pinjaman P2P Syariah</span>{" "}
            Berkah Menggapai Kesuksesan Bersama
          </span>
        </div>
        {/* Right Wrapper */}
        <div className="flex flex-col bg-slate-100  justify-between p-2 ">
          {/* Logo  */}
          <div className="max-w-[400px] w-full mx-auto pt-6 flex justify-center items-center">
            <img
              className="w-20 h-20 bg-blue-600 p-2 rounded-full flex justify-center items-end"
              src={LogoAmana}
              alt="Rounded avatar"
            />
          </div>

          {/* Form */}
          <div className="max-w-[400px] w-full mx-auto bg-zinc-50 p-4 sm:p-6 sm:px-8 shadow-md rounded-md">
            <div className="mb-4">
              <h1 className="text-xl font-sans font-semibold ">
                Lupa Password
              </h1>
              <span className="text-gray-500 text-sm">
                Silahkan masukkan email yang terdaftar
              </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Message
                status={success}
                message={message}
                visible={message !== null && !success ? true : false}
                onClose={() => {
                  dispatch(setMessage(null));
                }}
              />
              <div>
                <InputLabel
                  placeholder={"name@example.com"}
                  type={"text"}
                  name={"Email"}
                  register={{
                    ...register("email", {
                      required: true,
                    }),
                  }}
                  errors={errors.email}
                >
                  Email
                </InputLabel>
              </div>
              <Button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700"
              >
                {load ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loading className={"w-4 h-4 text-white"} />
                    <span>Loading </span>
                  </div>
                ) : (
                  <span className="text-sm">Kirim Link Ubah Kata Sandi</span>
                )}
              </Button>
              <div className="flex justify-between text-primary mt-1">
                <div className="flex items-center">
                  <p className="pr-1 text-xs text-right text-gray-500">
                    Sudah punya akun?
                  </p>
                  <Link
                    className="text-xs text-blue-600 font-semibold  hover:text-blue-700"
                    to="/login"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className="text-center text-sm text-[#959292] pb-2">
            <p className="">
              © AMANAH Fintech Syariah 2023. All Right Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordRequest;
