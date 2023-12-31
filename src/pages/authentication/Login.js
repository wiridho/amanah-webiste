import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputLabel } from "../../components/molekul";
import LogoAmana from "../../assets/img/logo/LogoAmana2.svg";
import BackgroundAuth from "../../assets/img/background/login.svg";
import { handleLogin } from "../../service/authentication/authService";

import { Button, Message, Loading } from "../../components/atom";
import { InputPassword } from "../../components/molekul";

import { setMessage } from "../../store/reducer/AuthReducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message, load, success } = useSelector((state) => state.auth);

  // Calling useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle Submit
  const onSubmit = (data) => {
    dispatch(handleLogin({ data, navigate }));
  };

  const location = useLocation();
  console.log(location.pathname);

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
            <div className="mb-5 text-center">
              <h1 className="text-xl font-sans font-semibold pb-2 ">
                Selamat datang
              </h1>
              <span className="text-sm text-gray-400 ">
                Silahkan log in untuk masuk ke akun anda
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
                <InputPassword
                  placeholder={"********"}
                  name={"Password"}
                  type={"password"}
                  label={"Password"}
                  register={{
                    ...register("password", {
                      required: true,
                    }),
                  }}
                  errors={errors.password}
                >
                  Password
                </InputPassword>
              </div>
              <Button
                type="submit"
                className="w-full mt-3 bg-blue-500 text-white hover:bg-blue-700"
              >
                {load ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loading className={"w-4 h-4 text-white"} />
                    <span>Loading </span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
              <div className="flex justify-between text-primary">
                <div className="flex items-center">
                  <p className="pr-1 text-xs text-right text-gray-500">
                    Belum punya akun?
                  </p>
                  <Link
                    className="text-xs text-blue-600 font-semibold  hover:text-blue-700"
                    to="/register-init"
                  >
                    Daftar Disini!
                  </Link>
                </div>
                <p className="p-2 text-xs text-right text-blue-600 hover:text-blue-700">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </p>
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

export default Login;
