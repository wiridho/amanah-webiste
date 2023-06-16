import { useState } from "react";
import LogoAmana from "../../assets/img/logo/LogoAmana2.svg";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import BackgroundAuth from "../../assets/img/background/login.svg";
import ErrorMessage from "../../components/error_message/ErrorMessage";
import { Button } from "../../components/atom";
import { InputLabel, InputPassword } from "../../components/molekul";
import { handleRegister } from "../../service/authentication/authService";
const Register = () => {
  const [visible, setVisible] = useState(false);

  const { roles } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message_error, load } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    data["roles"] = roles;
    dispatch(handleRegister({ data, setVisible, navigate }));
  };

  // calling useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  return (
    <>
      <div className="h-screen grid grid-cols-1 sm:grid-cols-2 font-inter">
        {/* Background */}
        <div className="bg-indigo-600 justify-center items-center hidden  md:flex">
          <div className="flex sm:w-2/3  items-center  justify-center">
            <img src={BackgroundAuth} className="" alt="" />
          </div>
        </div>

        {/* Form */}

        <div className=" flex flex-col  justify-around bg-slate-100 ">
          <div className="max-w-[400px] w-full mx-auto sm:pb-4 pt-3 flex justify-center items-center">
            <img
              className="w-20 h-20 bg-indigo-700 p-2 rounded-full"
              src={LogoAmana}
              alt="Rounded avatar"
            />
          </div>
          <form
            className="max-w-[400px] w-full mx-auto bg-gray-50 p-6 px-8 shadow rounded-2xl "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              {visible && (
                <ErrorMessage
                  message={message_error}
                  onClose={() => setVisible(false)}
                />
              )}
            </div>
            <div>
              <p className="font-sans text-2xl font-medium pb-3 text-slate-900 ">
                Daftar sebagai {roles}
              </p>
            </div>
            <div className="mb-3">
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
              </div>

              <div>
                <InputLabel
                  type={"text"}
                  name={"Full name"}
                  register={{
                    ...register("fullName", {
                      required: true,
                    }),
                  }}
                  errors={errors.email}
                >
                  Nama Lengkap
                </InputLabel>
              </div>
              <div>
                <InputLabel
                  type={"number"}
                  name={"Phone number"}
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
                className="w-full bg-indigo-700 hover:bg-indigo-600 text-white text-sm  py-2 px-4 rounded-lg"
              >
                {load ? "Loading..." : "Daftar"}
              </Button>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <p className="pr-1 text-xs text-right text-grey">
                  Sudah punya akun?
                </p>
                <Link
                  className="text-xs text-primary hover:text-[#146C94]"
                  to="/login"
                >
                  Masuk
                </Link>
              </div>
              <p className="p-2 text-xs text-right text-grey hover:text-[#146C94]">
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
