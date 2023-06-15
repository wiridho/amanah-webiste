import React from "react";
import { InputLabel, RadioButton } from "../../components/molekul";
import { useForm } from "react-hook-form";
import { Button, Label } from "../../components/atom";
import VerifikasiKYC from "./VerifikasiKYC2";
import { useState } from "react";
import {
  getLenderStatusKYC,
  verificationLenderKYC,
} from "../../service/verification-kyc/verification-kyc";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Kyc = () => {
  const [imageUrlSelfie, setImageUrlSelfie] = useState(false);
  const [imageUrlKTP, setImageUrlKTP] = useState(false);

  const [statusKYC, setStatusKYC] = useState(false);

  const [ambilGambarSelfie, setAmbilGambarSelfie] = useState(false);
  const [ambilGambarKTP, setAmbilGambarKTP] = useState(false);

  const [gambarSelfie, setGambarSelfie] = useState(null);
  const [gambarKTP, setGambarKTP] = useState(null);

  const { accessToken } = useSelector((state) => state.auth);

  // Calling useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getLenderStatusKYC({ accessToken });
      setStatusKYC(response?.data?.kyc);
    })();
  }, [statusKYC]);

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
    await verificationLenderKYC({ accessToken, formData });
    setStatusKYC("pending");
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
    return <span>Pending : Checking Data</span>;
  }

  if (statusKYC === "verified") {
    return <span>Verified : Data has been verified</span>;
  }

  return (
    <div>
      {!statusKYC ? (
        <span className="text-7xl">Loading</span>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <div>
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
          <div>
            <InputLabel
              type={"text"}
              name={"Nama Lengkap"}
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
          <div>
            <Label>Jenis Kelamin</Label>
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
          <div>
            <InputLabel
              type={"number"}
              name={"Gaji"}
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

          {gambarSelfie && <span>{gambarSelfie.name}</span>}

          {!imageUrlSelfie ? (
            <>
              {ambilGambarSelfie ? (
                <VerifikasiKYC
                  setImageUrl={setImageUrlSelfie}
                  selfieFile={handleDataSelfie}
                  fileName={"selfie.png"}
                />
              ) : (
                <div>
                  <Button
                    className={"bg-indigo-500 text-white"}
                    onClick={() => setAmbilGambarSelfie(!ambilGambarSelfie)}
                    type={"button"}
                  >
                    Ambil Gambar Diri
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              {imageUrlSelfie && <img src={imageUrlSelfie} alt="Foto Diri" />}
            </>
          )}

          {gambarKTP && <span>{gambarKTP.name}</span>}
          {!imageUrlKTP ? ( //true
            <>
              {ambilGambarKTP ? (
                <VerifikasiKYC
                  setImageUrl={setImageUrlKTP}
                  selfieFile={handleDataKtp}
                  fileName={"KTP.png"}
                />
              ) : (
                <div>
                  <Button
                    className={"bg-indigo-500 text-white"}
                    onClick={() => setAmbilGambarKTP(!ambilGambarKTP)}
                    type={"button"}
                  >
                    Ambil Foto KTP
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              <img src={imageUrlKTP} alt="KTP" />
            </>
          )}

          <br />
          <Button type={"submit"} className={"bg-indigo-500 text-white"}>
            Verifikasi Data Diri
          </Button>
        </form>
      )}
    </div>
  );
};

export default Kyc;
