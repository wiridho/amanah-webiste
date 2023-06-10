import React, { useEffect, useState } from "react";
// import Background from "../../assets/background.png";
// import Card from "../../components/FormRegistration/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resendRegisterVerify } from "../../service/authService";

// import { Button, Card, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";

// import { CheckIcon } from "@heroicons/react/24/outline";

const RegisterVerifySucess = () => {
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.auth);

  // const userId = data._id;
  // console.log(data._id);
  // console.log("isVerified", isVerified);

  console.log(data);

  // useEffect(() => {
  //   if (isVerified) {
  //     navigate("/login");
  //   }
  // }, [navigate, isVerified]);
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(verifyRegisterOtp({ otp: otp, userId: data._id }));
  // };

  const email = data.email;
  const userId = data.userId;

  const handleResend = () => {
    console.log(userId);
    console.log("resend click");
    dispatch(resendRegisterVerify(userId));
  };

  return (
    <>
      <div className="container mx-auto ">
        <div className="flex justify-center items-center h-screen">
          <div className="w-1/3">
            <div className=" p-5 bg-white border  rounded-xl  dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-center">
                {/* <CheckIcon className=" w-20 stroke-[3px] text-green-400 " /> */}
              </div>
              <div className="mb-8">
                <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                  Registration Success
                </h5>
              </div>
              <div className="bg-green-200 rounded p-3">
                <p className="mb-3  text-gray-800 font-normal">
                  Terima kasih, kami telah mengirim link verifikasi ke email
                  <strong> {email}.</strong>
                  Silahkan cek inbox anda untuk verifikasi email akun kamu.
                </p>
              </div>
              <div className="mt-3">
                <span>Belum menerima email? </span>
                <button
                  className="underline text-blue-500 font-semibold"
                  onClick={handleResend}
                >
                  {" "}
                  Kirim ulang!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterVerifySucess;
