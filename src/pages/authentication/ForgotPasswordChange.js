import React from "react";
import LogoAmana from "../../assets/img/logo/LogoAmana2.svg";
import { InputPassword } from "../../components/molekul";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassChange } from "../../service/authentication/authService";
import { Button, Loading, Message } from "../../components/atom";
import { setMessage } from "../../store/reducer/AuthReducer";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const ForgotPasswordChange = () => {
  // const location = useLocation();
  // console.log(location.pathname);
  const { email, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, load, success } = useSelector((state) => state.auth);

  // Calling useForm
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = (data) => {
    data["token"] = token;
    data["email"] = email;
    // dispatch(
    //   forgotPassChange({
    //     data,
    //     navigate: () => navigate("/login"),
    //   })
    // );
    console.log(data);
  };

  // useEffect(() => {
  //   dispatch(setMessage(null));
  // }, [location.pathname]);

  console.log("errors", errors);

  return (
    <>
      <div className="h-screen grid grid-cols-1 sm:grid-cols-2 overflow-hidden">
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
            <div>
              <h1 className="text-xl font-sans font-semibold pb-4">
                Lupa Password
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
                <InputPassword
                  placeholder={"********"}
                  name={"New Password"}
                  type={"password"}
                  label={"Password"}
                  register={{
                    ...register("newPassword", {
                      required: true,
                    }),
                  }}
                  errors={errors.newPassword}
                >
                  New Password
                </InputPassword>
              </div>
              <div>
                <InputPassword
                  placeholder={"********"}
                  name={"confirmPassword"}
                  type={"password"}
                  label={"Confirm Password"}
                  register={{
                    ...register("cpassword", {
                      required: true,
                      validate: (value) => {
                        if (value !== newPassword) {
                          return "The passwords do not match";
                        }
                        return true;
                      },
                    }),
                  }}
                  errors={errors?.cpassword}
                >
                  Confirm Password
                </InputPassword>
              </div>
              <Button
                type="submit"
                className="w-full mt-3 bg-blue-600 text-white hover:bg-blue-700"
              >
                {load ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loading />
                    <span>Loading </span>
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
              <div className="flex justify-between text-primary mt-1">
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

export default ForgotPasswordChange;
