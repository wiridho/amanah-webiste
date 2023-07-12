import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// Background
import LogoAmana from "../../assets/img/logo/LogoAmana2.svg";
import BackgroundAuth from "../../assets/img/background/login.svg";
// Component
import { Button, Message, Loading } from "../../components/atom";
import { InputLabel, InputPassword } from "../../components/molekul";
// Service
import { handleRegister } from "../../service/authentication/authService";
import { setMessage } from "../../store/reducer/AuthReducer";
const Register = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const { message, load, success } = useSelector((state) => state.auth);
  const { roles } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    data["roles"] = roles;
    dispatch(handleRegister({ data, setVisible, navigate }));
  };

  // calling useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(setMessage(null));
  }, [location.pathname]);

  return (
    <>
      <div className="h-screen grid grid-cols-1 sm:grid-cols-2 font-inter">
        {/* Background */}
        {/* {/* Left Wrapper */}
        <div className="hidden md:flex sm:block items-center relative">
          <div className="absolute bg-blue-600 opacity-100 h-screen w-full z-20 "></div>
          <span className="px-16 leading-[70px] text-white text-5xl z-50">
            Berkah Finansial melalui{" "}
            <span className="font-bold font-inter"> P2P Lending Syariah</span>{" "}
            Investasi yang Menginspirasi.
          </span>
        </div>
        {/* Form */}
        <div className=" flex flex-col  justify-around bg-slate-100 ">
          <div className="max-w-[400px] w-full mx-auto sm:pb-4 pt-3 flex justify-center items-center">
            <img
              className="w-20 h-20 bg-blue-600 p-2 rounded-full"
              src={LogoAmana}
              alt="Rounded avatar"
            />
          </div>
          <form
            className="max-w-[400px] w-full mx-auto bg-gray-50 p-6 px-8 shadow-md rounded-md "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <p className="font-sans text-2xl font-medium pb-3 text-slate-900 ">
                Daftar sebagai {roles}
              </p>
            </div>
            <div>
              <Message
                status={success}
                message={message}
                visible={message !== null && !success ? true : false}
                onClose={() => {
                  dispatch(setMessage(null));
                }}
              />
            </div>
            <div className="mb-3">
              <div>
                <InputLabel
                  placeholder={"nama@example.com"}
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

              <div>
                <InputLabel
                  placeholder={"John Doe"}
                  type={"text"}
                  name={"Nama lengkap"}
                  register={{
                    ...register("name", {
                      required: true,
                    }),
                  }}
                  errors={errors.fullName}
                >
                  Nama Lengkap
                </InputLabel>
              </div>
              <div>
                <InputLabel
                  placeholder={"628123456789"}
                  type={"number"}
                  name={"Nomor telepon"}
                  register={{
                    ...register("phoneNumber", {
                      required: true,
                    }),
                  }}
                  errors={errors.phoneNumber}
                >
                  Nomor Handphone
                </InputLabel>
              </div>
              <div>
                <InputPassword
                  placeholder={"********"}
                  name={"Password"}
                  type={"password"}
                  label={"Password"}
                  register={{
                    ...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    }),
                  }}
                  errors={errors.password}
                >
                  Password
                </InputPassword>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-indigo-700 text-white text-sm  py-2 px-4 rounded-lg"
              >
                {load ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loading />
                    <span>Loading </span>
                  </div>
                ) : (
                  "Daftar"
                )}
              </Button>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <p className="pr-1 text-xs text-right text-gray-500">
                  Sudah punya akun?
                </p>
                <Link
                  className="text-xs text-indigo-500 font-semibold  hover:text-indigo-800"
                  to="/login"
                >
                  Masuk
                </Link>
              </div>
              <p className="p-2 text-xs text-righ text-indigo-500 hover:text-blue-800">
                <Link to="/reset-password">Lupa Password?</Link>
              </p>
            </div>
          </form>
          <div className="text-center text-sm text-[#959292] pt-7">
            <p className="">
              © AMANAH Fintech Syariah 2023. All Right Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
