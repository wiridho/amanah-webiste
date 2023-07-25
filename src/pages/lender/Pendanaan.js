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
import { Link } from "react-router-dom";

const Pendanaan = () => {
  const dispatch = useDispatch();
  const [loanList, setListLoan] = useState(null);
  const [load, setLoad] = useState(true);
  const [value, setValue] = useState([1, 3]);
  const { accessToken, statusKYC } = useSelector((state) => state.auth);
  const { autoLend } = useSelector((state) => state.lender);

  const [openModalVerified, setOpenModalVerified] = useState(false);
  const [openModalPending, setOpenModalPending] = useState(false);
  const [openModalNotVerified, setOpenModalNotVerified] = useState(false);

  const [modal, setModal] = useState(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const filterDefault = async () => {
    let tenor = { tenor_min: 1, tenor_max: 12 };
    const response = await getAvailableLoan({
      params: tenor,
      accessToken,
    });
    setListLoan(response?.data);
    setValue([1, 12]);
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
      }, 500);
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

  const onClick = () => {
    if (statusKYC === "pending") {
      setOpenModalPending(true);
    } else if (statusKYC === "not verified") {
      setOpenModalNotVerified(true);
    } else {
      setModal(true);
    }
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
          {openModalPending && (
            <>
              {/* Modal Pending */}
              <div
                className={`z-10 fixed flex items-center justify-center transition-transform duration-1000 inset-0 backdrop-brightness-50 ${
                  openModalPending ? "" : "hidden"
                }`}
              >
                <div className=" bg-white w-full max-w-md rounded-md">
                  <div className=" w-full max-w-2xl max-h-full  ">
                    {/* Modal header */}
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                      <h3 className="text-xl font-semibold text-gray-900 ">
                        Verifikasi KYC sedang diproses
                      </h3>
                    </div>
                    {/* Modal body */}
                    <div className="p-6 space-y-6">
                      <p className="text-base leading-relaxed text-gray-500 ">
                        Mohon tunggu, kami akan infokan ketika peninjauan telah
                        selesai{" "}
                        <Link
                          className="underline text-blue-700 hover:text-blue-900"
                          to={"/funder/kyc"}
                        >
                          kembali ke halaman utama!
                        </Link>
                      </p>
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center px-5 py-3 space-x-2 justify-end border-t border-gray-200 rounded-b ">
                      <button
                        onClick={() => setOpenModalPending(false)}
                        className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {openModalNotVerified && (
            <>
              {/* Modal Not Verified */}
              <div
                className={`z-10 flex items-center justify-center fixed inset-0 backdrop-brightness-50 transition-opacity  ${
                  openModalNotVerified
                    ? "opacity-100"
                    : "hidden opacity-0 pointer-events-none"
                }`}
              >
                <div className=" bg-white w-full max-w-md rounded-md">
                  <div className=" w-full max-w-2xl max-h-full  ">
                    {/* Modal header */}
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                      <h3 className="text-xl font-semibold text-gray-900 ">
                        Akun belum diverifikasi
                      </h3>
                    </div>
                    {/* Modal body */}
                    <div className="p-6 space-y-6">
                      <p className="text-base leading-relaxed text-gray-500 ">
                        Akun anda belum verifikasi KYC, silahkan verifikasi
                        terlebih dahulu{" "}
                        <Link
                          className="underline text-blue-700 hover:text-blue-800"
                          to={"/funder/kyc"}
                        >
                          disini!
                        </Link>
                      </p>
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center justify-end px-5 py-3 space-x-2 border-t border-gray-200 rounded-b ">
                      <button
                        onClick={() => setOpenModalNotVerified(false)}
                        className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="shadow-md bg-white p-4 rounded-md ">
            {autoLend?.status === undefined && (
              <ButtonIcon
                className={
                  "w-full bg-blue-500 justify-center !gap-2 text-white text-center"
                }
                onClick={onClick}
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
