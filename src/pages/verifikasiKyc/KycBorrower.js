import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ButtonIcon,
  InputLabel,
  RadioButton,
  SelectInput,
} from "../../components/molekul";
import { Button, Label, Message } from "../../components/atom";
import Webcam from "./Webcam";
import { BsFillPersonVcardFill, BsPerson } from "react-icons/bs";
import { verificationBorrowerKYC } from "../../service/Borrower/borrowerVerificationKYC";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setMessage } from "../../store/reducer/AuthReducer";

const KycBorrower = () => {
  const [imageUrlSelfie, setImageUrlSelfie] = useState(false);
  const [imageUrlKTP, setImageUrlKTP] = useState(false);
  const [ambilGambarSelfie, setAmbilGambarSelfie] = useState(false);
  const [ambilGambarKTP, setAmbilGambarKTP] = useState(false);
  const [gambarSelfie, setGambarSelfie] = useState(null);
  const [gambarKTP, setGambarKTP] = useState(null);
  const { accessToken, statusKYC, message, success } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (statusKYC !== "not verified") {
      navigate("/borrower/kyc/status");
    }
  }, [statusKYC]);

  // Calling useForm
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const genderOptions = [
    { value: "ibu kandung", label: "Ibu Kandung" },
    { value: "ayah kandung", label: "Ayah Kandung" },
    { value: "kakak kandung", label: "Kakak Kandung" },
    { value: "sahabat", label: "Sahabat" },
    { value: "other", label: "other" },
  ];

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("personal.idCardNumber", data.idCardNumber);
    formData.append("personal.fullName", data.fullName);
    formData.append("personal.gender", data.gender);
    formData.append("personal.birthDate", data.birthDate);
    formData.append("personal.work.name", data.workName);
    formData.append("personal.work.salary", data.salary);
    formData.append(
      "relativesContact.firstRelative.name",
      data?.firstRelative?.name
    );
    formData.append(
      "relativesContact.firstRelative.relation",
      data?.firstRelative?.relation
    );
    formData.append(
      "relativesContact.firstRelative.phoneNumber",
      data?.firstRelative?.phoneNumber
    );
    formData.append(
      "relativesContact.secondRelative.name",
      data?.secondRelative?.name
    );
    formData.append(
      "relativesContact.secondRelative.relation",
      data?.secondRelative?.relation
    );
    formData.append(
      "relativesContact.secondRelative.phoneNumber",
      data?.secondRelative?.phoneNumber
    );
    formData.append("idCardImage", gambarKTP);
    formData.append("faceImage", gambarSelfie);

    dispatch(
      verificationBorrowerKYC({
        accessToken,
        formData,
      })
    );
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
    const isFormFilled = Object.keys(errors).length === 0;
    const isStateFilled = gambarKTP && gambarSelfie;
    return isFormFilled && isStateFilled;
  };

  return (
    <div>
      <div className="">
        <Message
          status={success}
          message={message}
          visible={message !== null ? true : false}
          onClose={() => dispatch(setMessage(null))}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="p-5 bg-white rounded-md">
            <h2 className="text-lg font-semibold leading-7 text-gray-600">
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
                      value={"pria"}
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
                  type={"date"}
                  name={"Tanggal Lahir"}
                  register={{
                    ...register("birthDate", {
                      required: true,
                    }),
                  }}
                  errors={errors.birthDate}
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
                  Pendapatan Perbulan
                </InputLabel>
              </div>
            </div>
          </div>
          <div className="p-5 bg-white rounded-md flex flex-col gap-7">
            <h2 className="text-lg font-semibold leading-7 text-gray-900">
              Informasi Kontak
            </h2>
            <div>
              <h1 className="text-gray-600"> Kerabat 1</h1>
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-2">
                  <InputLabel
                    placeholder={"Nama lengkap kerabat"}
                    name={"Nama"}
                    type={"text"}
                    register={{
                      ...register("firstRelative.name", {
                        required: true,
                      }),
                    }}
                    errors={errors?.["firstRelative"]?.["name"]}
                  >
                    Nama Lengkap kerabat
                  </InputLabel>
                </div>
                <div className="col-span-2">
                  <InputLabel
                    placeholder={"08123456789"}
                    type={"number"}
                    name={"Nomor telepon"}
                    register={{
                      ...register("firstRelative.phoneNumber", {
                        required: true,
                      }),
                    }}
                    errors={errors?.["firstRelative"]?.["phoneNumber"]}
                  >
                    Nomor Handphone
                  </InputLabel>
                </div>
                <div className="col-span-2">
                  <SelectInput
                    field={"Hubungan kerabat"}
                    name="firstRelative.relation"
                    control={control}
                    options={genderOptions}
                    defaultValue={genderOptions[0]}
                    errors={errors?.["firstRelative"]?.["relation"]}
                  >
                    Hubungan dengan Kerabat 1
                  </SelectInput>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-gray-600"> Kerabat 2</h1>
              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-2">
                  <InputLabel
                    placeholder={"Nama lengkap kerabat 2"}
                    name={"Nama"}
                    type={"text"}
                    register={{
                      ...register("secondRelative.name", {
                        required: true,
                      }),
                    }}
                    errors={errors?.["secondRelative"]?.["name"]}
                  >
                    Nama Lengkap kerabat
                  </InputLabel>
                </div>
                <div className="col-span-2">
                  <InputLabel
                    placeholder={"08123456789"}
                    type={"number"}
                    name={"Nomor telepon"}
                    register={{
                      ...register("secondRelative.phoneNumber", {
                        required: true,
                      }),
                    }}
                    errors={errors?.["secondRelative"]?.["phoneNumber"]}
                  >
                    Nomor Handphone
                  </InputLabel>
                </div>
                <div className="col-span-2">
                  <SelectInput
                    field={"Hubungan kerabat"}
                    name="secondRelative.relation"
                    control={control}
                    options={genderOptions}
                    defaultValue={genderOptions[0]}
                    errors={errors?.["secondRelative"]?.["relation"]}
                  >
                    Hubungan dengan kerabat 2
                  </SelectInput>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 bg-white p-4 rounded-md ">
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

          <Button
            type={"submit"}
            disabled={!isPhotoFilled()}
            className={` bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-500 ${
              !isPhotoFilled() && "disabled:bg-gray-500 cursor-not-allowed"
            }`}
          >
            Verifikasi Diri
          </Button>
        </form>
      </div>
    </div>
  );
};

export default KycBorrower;
