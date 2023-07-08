import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputLabel } from "../../components/molekul";
import LogoAmana from "../../assets/img/logo/LogoAmana2.svg";
import BackgroundAuth from "../../assets/img/background/login.svg";
import {
  handleLogin,
  handleLoginAdmin,
} from "../../service/authentication/authService";

import { Button, Message } from "../../components/atom";
import { InputPassword } from "../../components/molekul";

import { setMessage, setSuccess } from "../../store/reducer/AuthReducer";

const LoginAdmin = () => {
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
    dispatch(handleLoginAdmin({ data, navigate }));
  };

  console.log(message, success);
  console.log(message !== null && !success ? true : false);

  return (
    <>
      <div className="h-screen grid grid-cols-1 sm:grid-cols-2 overflow-hidden">
        {/* Left Wrapper */}
        <div className="hidden bg-primary md:flex sm:block items-center relative">
          <div className="absolute bg-blue-600 opacity-100 h-screen w-full z-20 "></div>
          <span className="px-16 leading-[70px] text-white text-5xl z-50">
            <span className="font-bold font-inter">Admin</span>{" "}
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
            <div>
              <h1 className="text-xl font-sans font-semibold pb-4">
                Welcome back !
              </h1>
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
                className="w-full mt-3 bg-blue-600 text-white hover:bg-blue-700"
              >
                {load ? "Loading..." : "Login"}
              </Button>
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

export default LoginAdmin;
