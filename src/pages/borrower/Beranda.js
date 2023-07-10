import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// icon
import { AiOutlineSchedule } from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi";

import { Badge, Button } from "../../components/atom";

import {
  getBorrowersLoan,
  getBorrowersPaymentSchedule,
  getLoanDisbursement,
  postPelunasanTagihan,
} from "../../service/Borrower/borrower";
import { FormatMataUang } from "../../utils/FormatMataUang";
import { Link, useNavigate } from "react-router-dom";
import { getProfileBorrower } from "../../service/Borrower/profile";
import { getBorrowerStatusKYC } from "../../service/Borrower/borrowerVerificationKYC";
import { setStatusKYC } from "../../store/reducer/AuthReducer";
import { checkStatusLoan } from "../../utils/Borrower/Borrower";
import _ from "lodash";
import StatusKYC from "../../components/molekul/statusKYC/StatusKYC";

const Beranda = () => {
  const [load, setLoad] = useState(true);
  const [disbursement, setDisbursement] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, statusKYC } = useSelector((state) => state.auth);
  const { paymentSchedule, profile, loanHistory, paymentLink } = useSelector(
    (state) => state.borrower
  );

  const handleGetSchedule = async () => {
    dispatch(getBorrowersPaymentSchedule({ accessToken }));
    setDisbursement(await getLoanDisbursement({ accessToken }));
  };

  const getStatusKYC = async () => {
    const response = await getBorrowerStatusKYC({ accessToken });
    dispatch(setStatusKYC(response));
  };

  const handleGetLoanHistory = () => {
    dispatch(getBorrowersLoan({ accessToken }));
  };

  useEffect(() => {
    if (load) {
      handleGetSchedule();
      handleGetLoanHistory();
      dispatch(getProfileBorrower({ accessToken }));
      setLoad(false);
    }
  }, [dispatch, paymentSchedule, loanHistory]);

  useEffect(() => {
    getStatusKYC();
  }, [statusKYC, dispatch]);

  // const checkUserKYC = () => {
  //   if (statusKYC === "pending") {
  //     return (
  //       <Button
  //         className={`bg-blue-800 hover:bg-blue-900 text-white font-medium`}
  //         onClick={() => navigate("/borrower/kyc/status")}
  //       >
  //         Cek Status
  //       </Button>
  //     );
  //   } else if (statusKYC === "not verified") {
  //     return (
  //       <Button
  //         className={`bg-blue-800 hover:bg-blue-900 text-white font-medium`}
  //         onClick={() => navigate("/borrower/kyc")}
  //       >
  //         Verifikasi Data
  //       </Button>
  //     );
  //   } else {
  //     return (
  //       <Button
  //         className={`bg-blue-800 hover:bg-blue-900 text-white font-medium`}
  //         onClick={() => navigate("/borrower/pengajuan-pinjaman")}
  //       >
  //         Ajukan Pinjaman
  //       </Button>
  //     );
  //   }
  // };

  const showModalPembayaran = () => {
    setShowModal(true);
  };

  const postBayarSekarang = () => {
    const data = {
      loanId: paymentSchedule?.loanId,
      billId: getBillId(),
    };
    dispatch(postPelunasanTagihan({ accessToken, data, setPaymentModal }));
    setShowModal(false);
  };

  const sisaPembayaran = () => {
    let sisa = 0;
    for (let i = 0; i < paymentSchedule?.paymentSchedule?.length; i++) {
      if (paymentSchedule?.paymentSchedule[i]?.status === "unpaid") {
        sisa += paymentSchedule?.paymentSchedule[i]?.amount;
      }
    }
    return sisa;
  };
  const jatuhTempoCurrentMonth = () => {
    // let tenor = "";
    // for (let i = 0; i < paymentSchedule?.paymentSchedule?.length; i++) {
    //   if (paymentSchedule?.paymentSchedule[i]?.status === "unpaid") {
    //     tenor += paymentSchedule?.paymentSchedule[i]?.date;
    //     break;
    //   }
    // }
    // return tenor;
    let jatuhTempo = _.filter(paymentSchedule?.paymentSchedule, {
      status: "unpaid",
    })[0]?.date;
    return jatuhTempo;
  };

  const getBillId = () => {
    let billId = _.filter(paymentSchedule?.paymentSchedule, {
      status: "unpaid",
    })[0]?.billId;
    return billId;
  };

  return (
    <div className="grid grid-cols-6 gap-10 font-nunito-sans ">
      <div className="col-span-3">
        <div className="flex flex-col  gap-4">
          <div>
            <article className="flex  flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
              <div className="flex flex-col items-center  gap-4">
                <div>
                  <span className="text-lg text-blue-900 font-semibold">
                    Limit Tersedia
                  </span>
                </div>
                <div>
                  <span className="text-3xl">
                    {profile?.loanLimit === null
                      ? FormatMataUang(0)
                      : FormatMataUang(profile?.loanLimit)}
                  </span>
                </div>
                <div>
                  {
                    <StatusKYC
                      component={
                        <Button
                          className={`bg-blue-800 hover:bg-blue-900 text-white font-medium`}
                          onClick={() =>
                            navigate("/borrower/pengajuan-pinjaman")
                          }
                        >
                          Ajukan Pinjaman
                        </Button>
                      }
                    />
                  }
                </div>
              </div>
            </article>
          </div>
          <div>
            <article className="rounded-lg border border-gray-100 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500 ">Tagihan bulan ini</p>
                  <p className="text-2xl font-medium text-gray-900">
                    {paymentSchedule?.currentMonth < 1
                      ? "Tidak ada tagihan bulan ini"
                      : FormatMataUang(paymentSchedule?.currentMonth)}
                  </p>
                  {paymentSchedule?.currentMonth < 1 ? (
                    ""
                  ) : (
                    <p className=" text-red-500 text-xs">
                      Jatuh tempo pada{" "}
                      {moment(jatuhTempoCurrentMonth()).format(
                        "DD MMMM YYYY hh:mm"
                      )}
                    </p>
                  )}
                </div>
                {paymentSchedule?.currentMonth <= 0 ? (
                  ""
                ) : (
                  <div
                    onClick={showModalPembayaran}
                    className="cursor-pointer bg-blue-100   rounded-full p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 text-blue-500"
                    >
                      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clipRule="evenodd"
                      />
                      <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                    </svg>
                  </div>
                )}
              </div>
            </article>
          </div>
          {/* Loan Disbursement */}
          {disbursement?.hasOwnProperty("amount") ? (
            <div className="col-span-3">
              <article className="rounded-lg border border-gray-100 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div>
                      <p className="text-sm text-gray-500 ">Status Pinjaman</p>
                      <p className="text-lg font-medium text-gray-900">
                        {checkStatusLoan(loanHistory?.active?.status)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 ">Nominal Pinjaman</p>
                      <p className="text-lg font-medium text-gray-900">
                        {FormatMataUang(disbursement?.amount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 ">Tenor</p>
                      <p className="text-lg font-medium text-gray-900">
                        {disbursement?.tenor} Bulan
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 ">Imbal hasil</p>
                      <p className="text-lg font-medium text-gray-900">
                        {FormatMataUang(disbursement?.yieldReturn)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 ">Skema Pembayaran</p>
                      <p className="text-lg font-medium text-gray-900">
                        {disbursement?.paymentSchema}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => navigate("list-bank")}
                  type={"button"}
                  className={`w-full mt-3 ${
                    loanHistory?.active?.status === "in borrowing"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-500 text-white cursor-not-allowed"
                  }`}
                  disabled={
                    loanHistory?.active?.status !== "in borrowing"
                      ? true
                      : false
                  }
                >
                  Cairkan Dana
                </Button>
              </article>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="col-span-3">
        <article className="flex  flex-col rounded-lg bg-white">
          <div className="border-b border-b-gray-200 p-5 flex items-center gap-3">
            <AiOutlineSchedule size={25} className="text-blue-900" />
            <span className="text-blue-900 font-medium">Jadwal Pembayaran</span>
          </div>
          <div className=" flex flex-col gap-3 py-3 px-5">
            {paymentSchedule?.paymentSchedule?.length < 1 ? (
              <div className="flex justify-center items-center">
                <span> Tidak ada jadwal pembayaran </span>
              </div>
            ) : (
              paymentSchedule?.paymentSchedule?.map((item, index) => {
                return (
                  <div key={index} className="flex justify-between">
                    <span>
                      <Badge
                        className={
                          item?.status === "paid"
                            ? "text-green-500 bg-green-50"
                            : "text-red-500 bg-red-50"
                        }
                      >
                        {moment(item?.date).format("DD MMMM YYYY")}
                      </Badge>
                    </span>
                    <span className="font-medium text-gray-700 font-mono">
                      {FormatMataUang(item?.amount)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
          <div className="p-5 border-t border-t-gray-200 mt-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-blue-900">
                <HiOutlineInformationCircle size={25} />
                <span className="font-medium">Keterangan</span>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-5 h-5 bg-red-100"></div>
                  <div>
                    <span className="font-medium text-gray-500 text-sm">
                      Belum dibayar
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-5 h-5 bg-green-100"></div>
                  <div>
                    <span className="font-medium text-gray-500 text-sm">
                      Sudah dibayar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Modal Link */}
        {paymentModal && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
            <div className="flex items-center min-h-screen">
              <div className="relative w-full max-w-lg px-6 py-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-2 text-center">
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-10">
                      <div className="flex flex-col text-center	bg-blue-100 p-4 rounded-md">
                        <div>
                          <span>Silahkan klik link untuk </span>
                          <a
                            href={paymentLink}
                            onClick={() => setPaymentModal(false)}
                            rel="noreferrer"
                            className="underline"
                            target="_blank"
                          >
                            Lanjutkan Pembayaran
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setShowModal(false)}
              ></div>
              <div className="flex items-center min-h-screen">
                <div className="relative w-full max-w-lg px-6 py-4 mx-auto bg-white rounded-md shadow-lg">
                  <div className="mt-2 text-center">
                    <div className="flex flex-col">
                      <div className="flex flex-col gap-10">
                        <div className="flex flex-col text-center	bg-blue-100 p-4 rounded-md">
                          <span className="text-blue-600">
                            Tagihan bulan ini
                          </span>
                          <span className="text-2xl font-semibold text-blue-600">
                            {FormatMataUang(paymentSchedule?.currentMonth)}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between">
                            <span>Pinjaman belum dibayar</span>
                            <span>
                              {paymentSchedule
                                ? FormatMataUang(sisaPembayaran())
                                : ""}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Jatuh Tempo</span>
                            <span>
                              {moment(jatuhTempoCurrentMonth()).format("LLL")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-600 rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-1"
                        onClick={postBayarSekarang}
                      >
                        Bayar Langsung
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-red-600 focus:ring-1"
                        onClick={() => setShowModal(false)}
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Beranda;
