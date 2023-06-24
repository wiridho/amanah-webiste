import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Component
import { ButtonIcon, InputLabel, RadioButton } from "../../components/molekul";
import { Button, ErrorMessage, Label } from "../../components/atom";

// Webcam
import Webcam from "./Webcam";

// Service
import {
  getLenderStatusKYC,
  verificationLenderKYC,
} from "../../service/lender/lenderVerificationKYC";

// Icon
import { BsFillPersonVcardFill, BsPerson } from "react-icons/bs";
import { setStatusKYC } from "../../store/reducer/AuthReducer";

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

  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const statusKYC = "not verified";

  const statusLender = async () => {
    if (statusKYC !== "not verified") {
      navigate("/funder/kyc/status");
    }
    if (load) {
      let loadKYC = await getLenderStatusKYC({ accessToken });
      console.log(loadKYC?.data?.kyc);
      dispatch(setStatusKYC(loadKYC?.data?.kyc));
      setLoad(false);
    }
  };

  useEffect(() => {
    statusLender();
  }, [dispatch, statusKYC]);

  // Calling useForm
  const {
    register,
    handleSubmit,
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
    setLoad(result.status);
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
    return gambarKTP && gambarSelfie;
  };
  return (
    <div className="bg-white px-4 py-2">
      <div className="my-2">
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
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-2">
            <InputLabel
              type={"number"}
              name={"No.KTP"}
              register={{
                ...register("idCardNumber", {
                  required: true,
                }),
              }}
              errors={errors.idCardNumber}
            >
              No.KTP
            </InputLabel>
          </div>
          <div className="col-span-2">
            <InputLabel
              type={"text"}
              name={"Nama lengkap"}
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
                  value={"male"}
                  errors={errors.gender}
                >
                  Male
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
                  value={"female"}
                >
                  Female
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
            <InputLabel
              type={"number"}
              name={"Pendapatan"}
              register={{
                ...register("salary", {
                  required: true,
                }),
              }}
              errors={errors.salary}
            >
              Pendapatan
            </InputLabel>
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
        </div>
      </form>
      <div>
        <div className=" flex justify-center ">
          <Button
            type={"submit"}
            disabled={!isPhotoFilled()}
            className={` bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-500 ${
              !isPhotoFilled() && "disabled:bg-gray-500"
            }`}
          >
            Verifikasi Diri
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Kyc;
