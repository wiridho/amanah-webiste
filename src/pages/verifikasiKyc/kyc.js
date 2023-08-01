import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Component
import { ButtonIcon, InputLabel, RadioButton } from "../../components/molekul";
import { Button, ErrorMessage, Label, Loading } from "../../components/atom";

// Webcam
import Webcam from "./Webcam";

// Service
import {
  getLenderStatusKYC,
  verificationLenderKYC,
} from "../../service/lender/lenderVerificationKYC";
import { setStatusKYC } from "../../store/reducer/AuthReducer";

// Icon
import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsFillPersonVcardFill,
  BsPerson,
} from "react-icons/bs";

import CamImg from "../../assets/img/people/cam.png";
import KTPimg from "../../assets/img/ktp/KTP.png";
import InputCurrency from "../../components/molekul/InputCurrency/InputCurrency";
import { digitKTP } from "../../utils/Borrower/Borrower";

const Kyc = () => {
  const [visible, setVisible] = useState(false);
  const [response, setResponseMessage] = useState("");
  const [load, setLoad] = useState(true);

  const [imageUrlSelfie, setImageUrlSelfie] = useState(false);
  const [imageUrlKTP, setImageUrlKTP] = useState(false);
  const [ambilGambarSelfie, setAmbilGambarSelfie] = useState(false);
  const [ambilGambarKTP, setAmbilGambarKTP] = useState(false);
  const [gambarSelfie, setGambarSelfie] = useState(null);
  const [gambarKTP, setGambarKTP] = useState(null);

  const { accessToken, statusKYC } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const statusLender = async () => {
    if (statusKYC !== "not verified") {
      navigate("/funder/kyc/status");
    }
    if (load) {
      let loadKYC = await getLenderStatusKYC({ accessToken });
      dispatch(setStatusKYC(loadKYC?.data?.kyc));
      setLoad(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      statusLender();
    }, 500);
  }, [dispatch, statusKYC]);

  // Calling useForm
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("personal.idCardNumber", data.idCardNumber);
    formData.append("personal.fullName", data.fullName);
    formData.append("personal.gender", data.gender);
    formData.append("personal.birthDate", data.birthDate);
    formData.append("personal.work.name", data.workName);
    formData.append("personal.work.salary", data.salary);
    formData.append("idCardImage", gambarKTP);
    formData.append("faceImage", gambarSelfie);

    const result = await verificationLenderKYC({
      accessToken,
      formData,
      setVisible,
      navigate,
    });

    if (result?.status) {
      dispatch(setStatusKYC(result?.data?.kyc));
    }
    // setLoad(result.status);
    if (!result.status || result.status === "Validation Error") {
      setResponseMessage(result?.message);
    }
  };

  const handleDataKtp = (data) => {
    setGambarKTP(data);
    setAmbilGambarKTP(false);
  };

  const handleDataSelfie = (data) => {
    setGambarSelfie(data);
    setAmbilGambarSelfie(false);
  };

  const isPhotoFilled = () => {
    // return gambarKTP && gambarSelfie;
    const isFormFilled = Object.keys(errors).length === 0;
    const isStateFilled = gambarKTP && gambarSelfie;
    return isFormFilled && isStateFilled;
  };
  return (
    <div className=" px-4 py-2 font-nunito-sans">
      {load ? (
        <div className="h-screen flex justify-center items-center">
          <span className="flex gap-3 items-center">
            <Loading className={"w-6 h-6 text-blue-500"} />
            <span className="text-md">Loading</span>
          </span>
        </div>
      ) : (
        <>
          <div className="my-2 ">
            {response && (
              <ErrorMessage
                message={response}
                visible={visible}
                onClose={() => setVisible(false)}
              />
            )}
          </div>
          <form
            className="bg-white px-5 py-2.5 rounded"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-lg font-semibold leading-7 text-gray-900 mb-3">
              Informasi Personal
            </h2>
            <div className="grid grid-cols-6 gap-5">
              <div className="col-span-2">
                <InputLabel
                  type={"number"}
                  name={"No.KTP"}
                  placeholder={"•••• •••• •••• ••••"}
                  register={{
                    ...register("idCardNumber", {
                      required: true,
                      validate: {
                        digitKTP,
                      },
                    }),
                  }}
                  errors={errors.idCardNumber}
                >
                  No.KTP
                </InputLabel>
                {console.log(errors)}
              </div>
              <div className="col-span-2">
                <InputLabel
                  type={"text"}
                  name={"Nama lengkap"}
                  placeholder={"John Doe"}
                  register={{
                    ...register("fullName", {
                      required: true,
                    }),
                  }}
                  errors={errors.fullName}
                >
                  Nama Lengkap
                </InputLabel>
              </div>
              <div className="col-span-2">
                <Label>Jenis Kelamin</Label>
                <div className="flex gap-3">
                  <div>
                    <RadioButton
                      name="Gender"
                      register={{
                        ...register("gender", {
                          required: true,
                        }),
                      }}
                      value={"Pria"}
                      errors={errors.gender}
                    >
                      Pria
                    </RadioButton>
                  </div>
                  <div>
                    <RadioButton
                      name="gender"
                      register={{
                        ...register("gender", {
                          required: true,
                        }),
                      }}
                      value={"wanita"}
                    >
                      Wanita
                    </RadioButton>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <InputLabel
                  name={"Tanggal Lahir"}
                  register={{
                    ...register("birthDate", {
                      required: true,
                    }),
                  }}
                  errors={errors.birthDate}
                  type={"date"}
                >
                  Tanggal lahir
                </InputLabel>
              </div>
              <div className="col-span-2">
                <InputLabel
                  type={"text"}
                  name={"Pekerjaan"}
                  placeholder={"Software Engineer"}
                  register={{
                    ...register("workName", {
                      required: true,
                    }),
                  }}
                  errors={errors.workName}
                >
                  Pekerjaan
                </InputLabel>
              </div>
              <div className="col-span-2">
                <InputCurrency
                  name={"salary"}
                  control={control}
                  placeholder={"Rp1.000.000"}
                  rules={{
                    required: "Pendapatan Perbulan wajib diisi",
                  }}
                  errors={errors}
                >
                  Pendapatan Perbulan
                </InputCurrency>
              </div>
              {/* Webcam */}
              <div className="col-span-3 flex flex-col items-center justify-center">
                <div className="">
                  <Label>Ambil Selfie</Label>
                  {gambarSelfie && (
                    <span className="flex justify-center bg-gray-400 text-white px-2 py-1 mb-2 rounded-md ">
                      {gambarSelfie.name}
                    </span>
                  )}
                </div>
                {ambilGambarSelfie ? (
                  <Webcam
                    setImageUrl={setImageUrlSelfie}
                    selfieFile={handleDataSelfie}
                    fileName={"selfie.png"}
                  />
                ) : (
                  <div>
                    <ButtonIcon
                      className={
                        "!px-4 !py-2 bg-blue-500 text-white hover:bg-transparent hover:text-blue-500 border hover:border-indigo-500"
                      }
                      onClick={() => setAmbilGambarSelfie(!ambilGambarSelfie)}
                      type={"button"}
                    >
                      <BsPerson />
                      Ambil Data Diri
                    </ButtonIcon>
                  </div>
                )}
              </div>
              <div className="mt-2 col-span-3 flex flex-col items-center justify-center  bg-slate-50 p-4">
                <span className="text-sm font-semibold text-center flex gap-2">
                  Contoh Pengambilan gambar selfie
                  <BsCheckCircleFill className="text-green-400 " size={20} />
                </span>
                <img src={CamImg} className="" alt="" />
              </div>
              <div className="col-span-3 flex flex-col items-center justify-center">
                <div>
                  <Label>Ambil foto KTP</Label>
                  {gambarKTP && (
                    <span className="flex justify-center bg-gray-400 text-white px-2 py-1 mb-2 rounded-md ">
                      {gambarKTP.name}
                    </span>
                  )}
                </div>
                {ambilGambarKTP ? (
                  <Webcam
                    setImageUrl={setImageUrlKTP}
                    selfieFile={handleDataKtp}
                    fileName={"KTP.png"}
                  />
                ) : (
                  <div className="flex">
                    <ButtonIcon
                      className={
                        "bg-blue-500  text-white hover:bg-transparent hover:text-indigo-500 border hover:border-indigo-500"
                      }
                      onClick={() => setAmbilGambarKTP(!ambilGambarKTP)}
                      type={"button"}
                    >
                      <BsFillPersonVcardFill className="" />
                      Ambil foto KTP
                    </ButtonIcon>
                  </div>
                )}
              </div>
              <div className="mt-2 col-span-3 flex flex-col items-center justify-center  bg-slate-50 p-4">
                <span className="text-sm font-semibold text-center flex gap-2">
                  Contoh Pengambilan gambar KTP
                  <BsCheckCircleFill className="text-green-400 " size={20} />
                </span>
                <img src={KTPimg} className="mt-4" alt="" />
              </div>
            </div>
            <div className="">
              <Button
                type={"submit"}
                disabled={!isPhotoFilled()}
                className={` w-full my-4 bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-500 ${
                  !isPhotoFilled() && "disabled:bg-gray-500 cursor-not-allowed"
                }`}
              >
                Verifikasi Diri
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Kyc;
