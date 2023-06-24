import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAvailableLoan } from "../../service/loans/loan";
import { useForm } from "react-hook-form";
import { Accordion, Slider } from "../../components/atom";
import { InputLabel } from "../../components/molekul";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import CardPendanaan from "./CardPendanaan";
import { Button } from "../../components/atom";

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
    let tenor = { tenor_min: 1, tenor_max: 3 };
    const response = await getAvailableLoan({
      params: tenor,
      accessToken,
    });
    setListLoan(response?.data);
    setValue([1, 3]);
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
                            children={"Biaya Minimum"}
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
                            children={"Biaya Maksimum"}
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
          "No Loan Available"
        )}
      </div>
    </div>
  );
};

export default Pendanaan;
