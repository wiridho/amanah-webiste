import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { Button, Message } from "../../atom";
import { useDispatch, useSelector } from "react-redux";
import InputCurrency from "../../molekul/InputCurrency/InputCurrency";
import _, { get } from "lodash";
import { postFundingAuto } from "../../../service/lender/autoLend";
import SelectInputMulti from "../../molekul/selectInputMulti/SelectInputMulti";
import { setMessage } from "../../../store/reducer/Lender/LenderFundingReducer";
import { opsiKategori } from "../../../utils/optionValues";

const ModalAutoLend = ({ onClose }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const { message, success } = useSelector((state) => state.lender);
  const { balance } = useSelector((state) => state.balance);
  const [value, setValue] = useState([1, 3]);

  const dispatch = useDispatch();

  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validasiBalance = (value) => {
    const amount = parseFloat(value.replace(/[^\d.-]/g, ""));
    if (amount > balance) {
      return "Saldo anda tidak cukup!";
    }
    return true;
  };

  const validasiStep = (value) => {
    const amount = parseFloat(value.replace(/[^\d.-]/g, "")); // Menghapus karakter non-angka dari value input
    if (amount % 50000 !== 0) {
      return "Kelipatan nominal harus Rp50.000!";
    }
    return true;
  };

  const validasiMinimum = (value) => {
    const { min } = getValues();
    const amount = parseFloat(value.replace(/[^\d.-]/g, ""));
    if (min > amount) {
      return "Nominal pendanaan tidak boleh kurang dari minimum Imbal hasil";
    }
    return true;
  };

  const onSubmit = (dataForm) => {
    let tenorValue = {
      tenorLength: {
        start: value[0],
        end: value[1],
      },
    };
    let yieldValue = {
      yieldRange: {
        start: Number(dataForm?.min),
        end: Number(dataForm?.max),
      },
    };

    let borrowingCategory = {
      borrowingCategory: _.map(dataForm.borrowingCategory, (d) => d.value),
    };

    let data = {
      ...tenorValue,
      ...yieldValue,
      ...{ amountToLend: Number(dataForm?.amountToLend) },
      ...borrowingCategory,
    };

    dispatch(postFundingAuto({ accessToken, data, onClose, dispatch }));
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto font-nunito-sans">
      <div className="fixed inset-0 w-full h- full bg-black opacity-40"></div>
      <div className="flex items-center min-h-screen">
        <div className="relative w-full max-w-lg mx-auto bg-white rounded-md p-6">
          <div className="flex flex-col gap-4">
            <div
              className="flex flex-col gap-2
            "
            >
              <span className="font-bold text-2xl text-gray-800 text-center">
                Autolend{" "}
              </span>
              <span className="text-gray-600 text-sm">
                Mohon lengkapi data di bawah ini untuk mengatur auto lending
                Anda.
              </span>
            </div>
            <div className="">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                  <div className="flex items-center gap-3">
                    <div>
                      <InputCurrency
                        name={"min"}
                        control={control}
                        placeholder={"Minimal Rp50.000"}
                        rules={{
                          required: "Imbal Hasil minimum wajib diisi",
                          min: {
                            value: 50000,
                            message: `Imbal Hasil minimum Rp50.000`,
                          },
                        }}
                        errors={errors}
                      >
                        Imbal Hasil Minimum
                      </InputCurrency>
                    </div>
                    <div>
                      <InputCurrency
                        name={"max"}
                        control={control}
                        rules={{
                          required: "Imbal Hasil maksimum wajib diisi",
                        }}
                        placeholder={"Imbal Hasil"}
                        errors={errors}
                      >
                        Imbal Hasil Maksimum
                      </InputCurrency>
                    </div>
                  </div>
                  <div className="my-2 flex flex-col gap-3">
                    <span className="block text-sm font-medium text-gray-700 my-2">
                      Durasi Pengembalian
                    </span>
                    <RangeSlider
                      id="range-slider"
                      min={1}
                      max={12}
                      step={1}
                      value={value}
                      onInput={setValue}
                    />

                    <span className="flex justify-center font-nunito-sans text-sm">
                      {value[0]}-{value[1]} Bulan
                    </span>
                  </div>
                  <div>
                    <SelectInputMulti
                      name="borrowingCategory"
                      control={control}
                      field={"Kategori Pinjaman"}
                      options={opsiKategori}
                      errors={errors}
                      rules={{
                        required: `Kategori Pinjaman wajib diisi!`,
                      }}
                    >
                      Kategori Pinjaman
                    </SelectInputMulti>
                  </div>
                  <div>
                    <InputCurrency
                      name={"amountToLend"}
                      placeholder={"Rp100.000"}
                      control={control}
                      rules={{
                        required: "Nominal wajib diisi",
                        min: {
                          value: 100000,
                          message: `Nominal Pendanaan minimal Rp100.000`,
                        },
                        validate: {
                          validasiBalance,
                        },
                      }}
                      errors={errors}
                    >
                      Jumlah Pendanaan
                    </InputCurrency>
                  </div>
                </div>
                <Button
                  type={"submit"}
                  className={
                    "bg-blue-500 hover:bg-blue-600 text-white w-full mt-4"
                  }
                >
                  Setup Auto Lending
                </Button>
              </form>
              <Button
                type={"button"}
                onClick={onClose}
                className=" text-red-500 hover:text-red-700 w-full "
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAutoLend;
