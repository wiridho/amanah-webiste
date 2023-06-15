import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAvailableLoan } from "../../service/loans/loan";
import { useForm } from "react-hook-form";
import { Accordion } from "../../components/atom";
import { CheckboxList, InputLabel } from "../../components/molekul";

import CardPendanaan from "./CardPendanaan";
import { Button } from "../../components/atom";
import { useState } from "react";
// import InputLabel from "../../components/molekul/input-label/InputLabel";
// import Accordion from "../../components/molekul/accordion/Accordion";
// import CheckboxList from "../../components/molekul/checkbox/checkboxList";

const Pendanaan = () => {
  const [loanList, setListLoan] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getAvailableLoan({ accessToken });
      const data = response?.data;
      setListLoan(data);
    })();
  }, []);

  const onSubmit = (data) => {
    console.log("filter", data);
  };

  const handleReset = () => {
    reset();
  };

  let checkbox_data = [
    { label: "1-3 bulan", value: "tenor_min=1&tenor_max=3" },
    { label: "4-5 bulan", value: "tenor_min=4&tenor_max=5" },
    { label: "6 bulan", value: "tenor_max=6" },
  ];

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
                <div>
                  <Accordion
                    name="imbalHasil"
                    title="Imbal Hasil"
                    type={"text"}
                    register={register}
                    children={
                      <div>
                        <InputLabel
                          placeholder={"Rp100.000"}
                          children={"Nilai Minimum"}
                          type={"number"}
                          name={"yield_min"}
                          register={{
                            ...register("yield_min"),
                          }}
                          errors={errors.email}
                        />
                        <InputLabel
                          placeholder={"Rp100.000.000"}
                          children={"Nilai Maksimum"}
                          type={"number"}
                          name={"yield_max"}
                          register={{
                            ...register("yield_max"),
                          }}
                        />
                      </div>
                    }
                  />
                </div>
                <div>
                  <Accordion
                    name="tenor"
                    title="Durasi Pengembalian"
                    children={
                      <div>
                        {checkbox_data.map((item, index) => {
                          return (
                            <div key={index}>
                              <CheckboxList
                                label={item.label}
                                value={item.value}
                                name={"tenor"}
                                register={{
                                  ...register("tenor"),
                                }}
                              />
                            </div>
                          );
                        })}
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
        {loanList ? <CardPendanaan data={loanList} /> : " No Loan Available"}
      </div>
    </div>
  );
};

export default Pendanaan;
