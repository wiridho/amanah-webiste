import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableLoan } from "../../service/loans/loan";
import { useForm } from "react-hook-form";
import { Accordion, Loading } from "../../components/atom";
import { ButtonIcon, InputLabel } from "../../components/molekul";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "../../style/rangeSlider.css";

import CardPendanaan from "./CardPendanaan";
import { Button } from "../../components/atom";

import LoanNotAvailable from "../../assets/img/error/loanNotAvailable.png";

import { MdWorkHistory } from "react-icons/md";
import ModalAutoLend from "../../components//organism/modalAutoLend/ModalAutoLend";
import {
  deleteFundingAuto,
  getFundingAuto,
} from "../../service/lender/autoLend";
import _ from "lodash";
import Swal from "sweetalert2";
import { FormatMataUang } from "../../utils/FormatMataUang";
import { opsiKategori } from "../../utils/optionValues";

const Pendanaan = () => {
  const dispatch = useDispatch();
  const [loanList, setListLoan] = useState(null);
  const [load, setLoad] = useState(true);
  const [value, setValue] = useState([1, 3]);
  const { accessToken } = useSelector((state) => state.auth);
  const { autoLend } = useSelector((state) => state.lender);

  const [modal, setModal] = useState(null);

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

  const getAutoLend = async () => {
    dispatch(getFundingAuto({ accessToken }));
  };

  useEffect(() => {
    filterDefault();
    if (load) {
      setTimeout(() => {
        getAutoLend();
        setLoad(false);
      }, 1000);
    }
  }, [load, autoLend]);

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

  const handleDeleteAutoLend = () => {
    Swal.fire({
      title: "Apakah anda ingin membatalkan autolend?",
      showCancelButton: true,
      cancelButtonText: "Tidak",
      confirmButtonText: "Ya, Batalkan",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteFundingAuto({ data: autoLend?._id, accessToken }));
        getAutoLend();
      }
    });
  };

  const handleReset = async () => {
    reset();
    await filterDefault();
  };

  return (
    <div className="font-nunito-sans">
      <div className="flex items-center justify-between mb-4">
        <div className="">
          <h1 className="text-2xl font-semibold">Pendanaan</h1>
          <span>Total {loanList?.length} pinjaman tesedia</span>
        </div>
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-[auto_1fr] gap-10 ">
        {/* Filter */}
        <div>
          <div className="shadow-md rounded-md bg-white p-2 mb-4">
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
                    children={
                      <div>
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
                  "bg-blue-500 w-full text-white mt-3  font-semibold hover:bg-blue-600"
                }
                type={"submit"}
              >
                Atur Filter
              </Button>
              <Button
                type={"button"}
                onClick={handleReset}
                className={
                  "w-full mt-2 font-semibold text-blue-500 hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                }
              >
                Reset
              </Button>
            </form>
          </div>

          <div className="shadow-md bg-white p-4 rounded-md ">
            {autoLend?.status === undefined && (
              <ButtonIcon
                className={
                  "w-full bg-blue-500 justify-center !gap-2 text-white text-center"
                }
                onClick={() => setModal(true)}
              >
                <MdWorkHistory size={25} /> Tambah Auto Lending
              </ButtonIcon>
            )}
            {autoLend?.status !== undefined && (
              <Accordion
                title={"Autolend anda"}
                children={
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="block">Nominal Pendanaan</p>
                      <p className="font-bold">
                        {FormatMataUang(autoLend?.amountToLend)}
                      </p>
                    </div>
                    <div>
                      <p className="block">Imbal Hasil</p>
                      <span>{FormatMataUang(autoLend?.yieldRange?.start)}</span>
                      {" - "}
                      <span>{FormatMataUang(autoLend?.yieldRange?.end)}</span>
                    </div>
                    <div>
                      <p className="block">Kategori Pinjaman</p>
                      <p>{_.join(autoLend?.borrowingCategory, ",")}</p>
                    </div>
                    <div>
                      <p className="">Periode Tenor</p>
                      <span>{autoLend?.tenorLength?.start}</span>-
                      <span>{autoLend?.tenorLength?.end}</span> Bulan
                    </div>
                    <Button
                      className={
                        "text-red-500 border  hover:bg-red-500 hover:text-white border-red-400  w-full mb-2"
                      }
                      onClick={() => handleDeleteAutoLend()}
                      type={"button"}
                    >
                      Batalkan Autolend
                    </Button>
                  </div>
                }
              />
            )}
          </div>
        </div>

        {modal && <ModalAutoLend onClose={() => setModal(false)} />}

        {/* Card Pendanaan */}
        {load ? (
          <Loading className={"w-4 h-4 text-blue-500"} />
        ) : (
          <>
            {loanList?.length > 0 ? (
              <CardPendanaan data={loanList} />
            ) : (
              //ga ada loan
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
          </>
        )}
      </div>
    </div>
  );
};

export default Pendanaan;
