import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputLabel } from "../../components/molekul";
import LogoAmana from "../../assets/img/logo/LogoAmana2.svg";
import BackgroundAuth from "../../assets/img/background/login.svg";
import { handleLogin } from "../../service/authentication/authService";

import { Button, ErrorMessage } from "../../components/atom";
import { InputPassword } from "../../components/molekul";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message_error, load } = useSelector((state) => state.auth);
  console.log("load", load);
  console.log("message_error", message_error);

  // Calling useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle Submit
  const onSubmit = (data) => {
    console.log(data);
    dispatch(handleLogin({ data, navigate, setVisible }));
  };

  return (
    <>
      <div className="h-screen grid grid-cols-1 sm:grid-cols-2">
        {/* Left Wrapper */}
        <div className="hidden bg-primary md:flex sm:block items-center relative">
          <div className="absolute bg-indigo-600 opacity-100 h-screen w-full z-20 "></div>
          <span className="px-16 leading-[70px] text-white text-5xl z-50">
            Investasi{" "}
            <span className="font-bold font-inter">Pinjaman P2P Syariah</span>{" "}
            Berkah Menggapai Kesuksesan Bersama
          </span>
          <img src={BackgroundAuth} alt="imgLogin" className="z-10 absolute" />
        </div>
        {/* Right Wrapper */}
        <div className="flex flex-col bg-slate-100  justify-between p-2 ">
          {/* Logo  */}
          <div className="max-w-[400px] w-full mx-auto pt-6 flex justify-center items-center">
            <img
              className="w-20 h-20 bg-indigo-700 p-2 rounded-full flex justify-center items-end"
              src={LogoAmana}
              alt="Rounded avatar"
            />
          </div>

          {/* Form */}
          <div className="max-w-[400px] w-full mx-auto bg-zinc-50 p-6 px-8 shadow-lg rounded-2xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h1 className="text-xl font-sans font-semibold pb-4">
                  Welcome back !
                </h1>
              </div>
              <div className="mb-3">
                {visible && (
                  <ErrorMessage
                    message={message_error}
                    onClose={() => setVisible(false)}
                  />
                )}
              </div>
              <div>
                <InputLabel
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
                className="w-full mt-3 bg-indigo-700 text-white hover:bg-indigo-600"
              >
                {load ? "Loading..." : "Login"}
              </Button>
              <div className="flex justify-between text-primary">
                <div className="flex items-center">
                  <p className="pr-1 text-xs text-right text-gray-500">
                    Belum punya akun?
                  </p>
                  <Link
                    className="text-xs text-indigo-500 font-semibold  hover:text-blue-800"
                    to="/register-init"
                  >
                    Daftar Disini!
                  </Link>
                </div>
                <p className="p-2 text-xs text-right text-grey text-indigo-500 hover:text-blue-800">
                  <Link to="/reset-password">Forgot Password?</Link>
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
