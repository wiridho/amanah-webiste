import React, { useEffect } from "react";
import { ButtonIcon, InputLabel, RadioButton } from "../../components/molekul";
import { useForm } from "react-hook-form";
import { Button, ErrorMessage, Label } from "../../components/atom";
import VerifikasiKYC from "./VerifikasiKYC2";
import { useState } from "react";

import {
  getLenderStatusKYC,
  verificationLenderKYC,
} from "../../service/lender/lenderVerificationKYC";

import { useDispatch, useSelector } from "react-redux";
import { BsFillPersonVcardFill, BsPerson } from "react-icons/bs";
import { authActions } from "../../store/reducer/AuthReducer";
import { useNavigate } from "react-router-dom";

const Kyc = () => {
  const [visible, setVisible] = useState(false);
  const { accessToken, statusKYC } = useSelector((state) => state.auth);
  const [response, responseMessage] = useState("");

  const [imageUrlSelfie, setImageUrlSelfie] = useState(false);
  const [imageUrlKTP, setImageUrlKTP] = useState(false);

  const [ambilGambarSelfie, setAmbilGambarSelfie] = useState(false);
  const [ambilGambarKTP, setAmbilGambarKTP] = useState(false);

  const [gambarSelfie, setGambarSelfie] = useState(null);
  const [gambarKTP, setGambarKTP] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calling useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getStatusKYC = async () => {
    try {
      const response = await getLenderStatusKYC({ accessToken });
      dispatch(authActions.setStatusKYC(response?.data?.kyc));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatusKYC();
  }, []);

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
    });
    if (result) {
      responseMessage(result?.message);
    }
    navigate("/funder");
  };

  const handleDataKtp = (data) => {
    console.log("Gambar KTP", data);
    setGambarKTP(data);
    setAmbilGambarKTP(false);
  };

  const handleDataSelfie = (data) => {
    console.log("Gambar Selfie", data);
    setGambarSelfie(data);
    setAmbilGambarSelfie(false);
  };

  if (statusKYC === "pending") {
    return <span>Pending : Pengajuan sedang dalam proses</span>;
  }

  if (statusKYC === "verified") {
    return <span>Sudah Verified</span>;
  }

  if (statusKYC === "not verified") {
    return (
      <div>
        <form
          className="bg-white px-5 py-2.5 rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
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
            <div className="col-span-1">
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
                Full Name
              </InputLabel>
            </div>
            <div className="px-4">
              <Label>Jenis Kelamin</Label>
              <div className="flex gap-3 py-2">
                <RadioButton
                  name="gender"
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
            <div>
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
                Birthdate
              </InputLabel>
            </div>
            <div>
              <InputLabel
                type={"text"}
                name={"pekerjaan"}
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
            <div className="">
              <InputLabel
                type={"number"}
                name={"gaji"}
                register={{
                  ...register("salary", {
                    required: true,
                  }),
                }}
                errors={errors.salary}
              >
                Gaji
              </InputLabel>
            </div>
          </div>
          <div>
            {response && (
              <ErrorMessage
                message={response}
                visible={visible}
                onClose={() => setVisible(false)}
              />
            )}
          </div>
          {gambarSelfie && <span>{gambarSelfie.name}</span>}
          {ambilGambarSelfie ? (
            <VerifikasiKYC
              setImageUrl={setImageUrlSelfie}
              selfieFile={handleDataSelfie}
              fileName={"selfie.png"}
            />
          ) : (
            <div>
              <ButtonIcon
                className={
                  "!px-4 !py-2 bg-indigo-500 text-white hover:bg-transparent hover:text-indigo-500 border hover:border-indigo-500"
                }
                onClick={() => setAmbilGambarSelfie(!ambilGambarSelfie)}
                type={"button"}
              >
                <BsPerson />
                Ambil Data Diri
              </ButtonIcon>
            </div>
          )}
          {gambarKTP && <span>{gambarKTP.name}</span>}
          {ambilGambarKTP ? (
            <VerifikasiKYC
              setImageUrl={setImageUrlKTP}
              selfieFile={handleDataKtp}
              fileName={"KTP.png"}
            />
          ) : (
            <div>
              <ButtonIcon
                className={
                  "bg-indigo-500 text-white hover:bg-transparent hover:text-indigo-500 border hover:border-indigo-500"
                }
                onClick={() => setAmbilGambarKTP(!ambilGambarKTP)}
                type={"button"}
              >
                <BsFillPersonVcardFill className="" />
                Ambil foto KTP
              </ButtonIcon>
            </div>
          )}
          <Button type={"submit"} className={"bg-indigo-500 text-white"}>
            Verifikasi Data Diri
          </Button>
        </form>
      </div>
    );
  }
};

export default Kyc;
