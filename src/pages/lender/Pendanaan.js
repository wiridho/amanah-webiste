import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAvailableLoan } from "../../service/loans/loan";
import { useForm } from "react-hook-form";
import { Accordion } from "../../components/atom";
import { InputLabel } from "../../components/molekul";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import CardPendanaan from "./CardPendanaan";
import { Button } from "../../components/atom";

import Warning from "../../assets/img/error/warning.png";
import LoanNotAvailable from "../../assets/img/error/loanNotAvailable.png";
import "../../style/rangeSlider.css";

const Pendanaan = () => {
  const [loanList, setListLoan] = useState(null);
  const [value, setValue] = useState([1, 3]);
  const { accessToken } = useSelector((state) => state.auth);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const filterDefault = async () => {
    let tenor = { tenor_min: 1, tenor_max: 11 };
    const response = await getAvailableLoan({
      params: tenor,
      accessToken,
    });
    setListLoan(response?.data);
    setValue([1, 11]);
  };

  useEffect(() => {
    filterDefault();
  }, []);

  const onSubmit = async (data) => {
    let tenorValue = {
      tenor_min: value[0],
      tenor_max: value[1],
    };
    let params = {
      ...data,
      ...tenorValue,
    };

    const response = await getAvailableLoan({ params, accessToken });
    setListLoan(response?.data);
  };

  const handleReset = async () => {
    reset();
    await filterDefault();
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <div className="">
          <h1 className="text-2xl font-semibold">Pendanaan</h1>
          <span>Total 5 Aktif, 5 Penuh, 100 Berhasil</span>
        </div>
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-[auto_1fr] gap-10 ">
        {/* Filter */}
        <div className="">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="">
                  <Accordion
                    name="imbalHasil"
                    title="Imbal Hasil"
                    type={"text"}
                    register={register}
                    children={
                      <div className="">
                        <div className="">
                          <InputLabel
                            placeholder={"Rp100.000"}
                            children={"Imbal hasil minimum"}
                            type={"number"}
                            register={{
                              ...register("yield_min"),
                            }}
                            errors={errors.email}
                          />
                        </div>
                        <div className="pb-5">
                          <InputLabel
                            placeholder={"Rp100.000.000"}
                            children={"Imbal hasil maksimum"}
                            type={"number"}
                            register={{
                              ...register("yield_max"),
                            }}
                          />
                        </div>
                      </div>
                    }
                  />
                </div>
                <div>
                  <Accordion
                    title={"Durasi Pengembalian"}
                    className={"p-4"}
                    children={
                      <div className="">
                        <RangeSlider
                          id="range-slider"
                          className={"my-3"}
                          min={1}
                          max={12}
                          step={1}
                          value={value}
                          onInput={setValue}
                        />
                        <span className="flex justify-center pb-4 font-nunito-sans text-sm">
                          {value[0]}-{value[1]} Bulan
                        </span>
                      </div>
                    }
                  />
                </div>
              </div>
              <Button
                className={
                  "bg-indigo-500 w-full text-white mt-3 !rounded-full font-semibold hover:bg-indigo-600 round"
                }
                type={"submit"}
              >
                Atur Filter
              </Button>
              <Button
                type={"button"}
                onClick={handleReset}
                className={
                  "w-full text-indigo-500 font-semibold hover:text-indigo-700"
                }
              >
                Reset
              </Button>
            </form>
          </div>
        </div>
        {/* Card Pendanaan */}
        {loanList?.length > 0 ? (
          <CardPendanaan data={loanList} />
        ) : (
          <div className="h-3/4 flex items-center justify-center">
            <div className="w-3/4 rounded-md border shadow-sm bg-white">
              <div className="p-5 flex items-center justify-center">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <span className="text-3xl text-center font-semibold text-[#434E65] ">
                    Ooops!
                  </span>
                  <img
                    src={LoanNotAvailable}
                    style={{ width: 200, height: 200 }}
                    alt=""
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-xl text-center font-bold text-red-500 ">
                      Tidak ada pinjaman
                    </span>
                    <span className=" font-normal text-center text-red-400 ">
                      Maaf sedang tidak ada pinjaman yang tersedia
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pendanaan;
