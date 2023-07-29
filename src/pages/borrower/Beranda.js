import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";

// icon
import { AiOutlineSchedule } from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { CgOpenCollective } from "react-icons/cg";

// image
import BillImg from "../../assets/img/bill/bill.png";
import CalendarImg from "../../assets/img/calendar/calendar.png";

// Component
import { Badge, Button } from "../../components/atom";

// Service
import {
  getBorrowersLoan,
  getBorrowersPaymentSchedule,
  getLoanDisbursement,
  postPelunasanTagihan,
} from "../../service/Borrower/borrower";
import { FormatMataUang } from "../../utils/FormatMataUang";
import { getProfileBorrower } from "../../service/Borrower/profile";
import { getBorrowerStatusKYC } from "../../service/Borrower/borrowerVerificationKYC";
import { setStatusKYC } from "../../store/reducer/AuthReducer";
import {
  checkStatusLoan,
  sisaPembayaran,
  statusLoanActive,
} from "../../utils/Borrower/Borrower";
import StatusKYC from "../../components/molekul/statusKYC/StatusKYC";
import { checkNaN } from "../../utils/CheckNan";

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
  const activeLoan = loanHistory?.active;

  let progress = (activeLoan?.totalFund / activeLoan?.amount) * 100;

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

  const jatuhTempoCurrentMonth = () => {
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

  // const statusLoanActive = (params) => {
  //   let status = "";
  //   const statusWaiting = ["on request", "on process"];
  //   const statusSelesai = ["Repayment", "late repayment"];

  //   if (statusWaiting.includes(params)) {
  //     status = (
  //       <span className="text-yellow-400 bg-yellow-50 px-2 rounded">
  //         Menunggu Pendanaan
  //       </span>
  //     );
  //   }
  //   if (params === "disbursement") {
  //     status = (
  //       <span className="text-indigo-400 bg-indigo-50 px-2 rounded">
  //         Sudah Dicairkan
  //       </span>
  //     );
  //   }
  //   if (params === "in borrowing") {
  //     status = (
  //       <span className="text-indigo-400 bg-indigo-50 px-2 rounded">
  //         Pinjaman Terkumpul
  //       </span>
  //     );
  //   }
  //   if (statusSelesai.includes(params)) {
  //     status = (
  //       <span className="text-green-400 bg-green-50 px-2 rounded">
  //         Pinjaman Sudah Lunas
  //       </span>
  //     );
  //   }
  //   return status;
  // };

  function getStatusClass(status) {
    if (status === "paid") {
      return "text-green-500 bg-green-50";
    } else if (status === "unpaid") {
      return "text-red-500 bg-red-50";
    } else {
      return "text-white bg-green-700";
    }
  }

  console.log(loanHistory?.active?.status);

  return (
    <div className="grid grid-cols-6 gap-10 font-nunito-sans ">
      <div className="col-span-3">
        <div className="flex flex-col gap-4">
          <div>
            <article className="flex flex-col gap-4 rounded-md shadow-md border border-gray-100 bg-white p-6">
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
                          disabled={
                            activeLoan?.loanId !== undefined ? true : false
                          }
                          className={`${
                            activeLoan?.loanId !== undefined
                              ? "bg-gray-500  cursor-not-allowed"
                              : "bg-blue-800 hover:bg-blue-900"
                          }  text-white font-medium`}
                          onClick={() =>
                            navigate("/borrower/pengajuan-pinjaman")
                          }
                        >
                          {activeLoan?.loanId !== undefined
                            ? "Sedang ada pinjaman aktif"
                            : "Ajukan Pinjaman"}
                        </Button>
                      }
                    />
                  }
                </div>
              </div>
            </article>
          </div>
          <div>
            <article className="rounded-md shadow-md border border-gray-100 bg-white">
              <div className="border-b border-b-gray-200 p-5 flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
                <span className="text-blue-900 font-medium">
                  Tagihan bulan ini
                </span>
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="flex flex-col gap-2 content-center w-full">
                  <div className="text-2xl font-medium text-gray-900 ">
                    {paymentSchedule?.currentMonth < 1 ? (
                      <div className="flex flex-col justify-center items-center w-full ">
                        <img
                          src={BillImg}
                          className=""
                          style={{ width: 100, height: 100 }}
                          alt=""
                        />
                        <p className="text-red-400 text-base pt-3">
                          Tidak ada tagihan bulan ini
                        </p>
                      </div>
                    ) : (
                      FormatMataUang(paymentSchedule?.currentMonth)
                    )}
                  </div>
                  {paymentSchedule?.currentMonth < 1 ? (
                    ""
                  ) : (
                    <p className=" text-red-500 text-xs">
                      Jatuh tempo pada
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
                    className="cursor-pointer bg-blue-100 hover:bg-blue-200 flex items-center gap-2 font-medium  rounded-full p-3"
                  >
                    <span className="text-blue-500 font-medium">Bayar</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-blue-500"
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
              <div className="border-b border-b-gray-200 p-5 flex items-center gap-3 bg-white rounded-t-md  shadow-md">
                <CgOpenCollective size={25} className="text-blue-900" />
                <span className="text-blue-900 font-medium">
                  Pencairan Pinjaman
                </span>
              </div>
              <article className="  bg-white p-5 rounded-b-md  shadow-md">
                <div className="flex items-center justify-between">
                  <div className="w-full flex flex-col gap-4">
                    <div className=" flex justify-between items-center">
                      <p className="text-sm text-gray-500 ">Status Pinjaman</p>
                      <p className="font-medium text-gray-900">
                        {statusLoanActive(disbursement?.status)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 ">Nominal Pinjaman</p>
                      <p className=" font-medium text-gray-900">
                        {FormatMataUang(disbursement?.amount)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 ">Tenor</p>
                      <p className=" font-medium text-gray-900">
                        {disbursement?.tenor} Bulan
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 ">Imbal hasil</p>
                      <p className=" font-medium text-gray-900">
                        {FormatMataUang(disbursement?.yieldReturn)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 ">Skema Pembayaran</p>
                      <p className=" font-medium text-gray-900">
                        {disbursement?.paymentSchema}
                      </p>
                    </div>
                  </div>
                </div>
                {disbursement?.status === "in borrowing" ||
                  (disbursement?.status === "Belum dicairkan" && (
                    <Button
                      onClick={() => navigate("form-pencairan")}
                      type={"button"}
                      className={`w-full mt-3 ${
                        disbursement?.status === "Belum dicairkan"
                          ? "bg-blue-500 text-white hover:bg-blue-700"
                          : "bg-gray-500 text-white cursor-not-allowed"
                      }`}
                      disabled={
                        disbursement?.status !== "Belum dicairkan"
                          ? true
                          : false
                      }
                    >
                      Cairkan Dana Sekarang
                    </Button>
                  ))}
              </article>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="col-span-3">
        <article className="flex flex-col rounded-lg bg-white shadow-md">
          <div className="border-b border-b-gray-200 p-5 flex items-center gap-3">
            <AiOutlineSchedule size={25} className="text-blue-900" />
            <span className="text-blue-900 font-medium">Jadwal Pembayaran</span>
          </div>
          <div className=" flex flex-col gap-3 py-3 px-5">
            {paymentSchedule?.paymentSchedule?.length < 1 ? (
              <div className="flex flex-col justify-center items-center">
                <img src={CalendarImg} style={{ width: 100 }} alt="" />
                <span className="text-red-400 text-base pt-4">
                  Tidak ada jadwal pembayaran
                </span>
              </div>
            ) : (
              paymentSchedule?.paymentSchedule?.map((item, index) => {
                return (
                  <div key={index} className="flex justify-between">
                    <span>
                      <Badge className={getStatusClass(item?.status)}>
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
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-5 h-5 bg-green-700"></div>
                  <div>
                    <span className="font-medium text-gray-500 text-sm">
                      Terlambat Pelunasan
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
            <div className="flex items-center min-h-screen font-nunito-sans">
              <div className="relative w-full max-w-lg px-6 py-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-2 text-center">
                  <div className="flex flex-col">
                    <div className="flex flex-col bg-white border shadow-sm rounded-md p-4 md:p-5">
                      <h3 className="text-lg font-bold text-gray-800 ">
                        Selesaikan Pembayaran
                      </h3>

                      <p className="mt-2 text-gray-800">
                        Segera lanjutkan pembayaran anda untuk menyelesaikan
                        proses ini dan nikmatisepenuhnya manfaat layanan kami.
                      </p>
                      <div className="flex justify-between items-center">
                        <a
                          href={paymentLink}
                          onClick={() => setPaymentModal(false)}
                          rel="noreferrer"
                          // className="underline"
                          target="_blank"
                          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-700"
                        >
                          Lanjutkan Pembayaran
                          <svg
                            className="w-2.5 h-auto"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                            />
                          </svg>
                        </a>
                        <button
                          type="button"
                          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700"
                          onClick={() => setPaymentModal((state) => !state)}
                        >
                          Tutup
                        </button>
                      </div>
                    </div>
                    {/* <div className="flex flex-col gap-10">
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
                    </div> */}
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
                              {paymentSchedule &&
                                FormatMataUang(
                                  sisaPembayaran(
                                    paymentSchedule?.paymentSchedule
                                  )
                                )}
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
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-1"
                        onClick={postBayarSekarang}
                      >
                        Bayar Langsung
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-red-500 rounded-md outline-none  ring-offset-2 ring-red-600 focus:ring-1"
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

        <div className="mt-3">
          <div className="shadow-md bg-white rounded-md ">
            <div className="">
              <div className="border-b border-b-gray-200 p-5 flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>

                {/* <AiOutlineSchedule size={25} className="text-blue-900" /> */}
                <span className="text-blue-900 font-medium">
                  Pinjaman Aktif
                </span>
              </div>
              <div className="flex flex-col justify-between p-5 bg-white ">
                <div className="flex flex-col text-center	bg-blue-100 p-4">
                  <span className="text-blue-600">Pinjaman aktif anda</span>
                  <span className="text-2xl font-semibold text-blue-600">
                    {FormatMataUang(activeLoan?.amount)}
                  </span>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-base text-gray-800">Imbal Hasil</span>
                    <span className="font-semibold  text-gray-700">
                      {activeLoan?.yieldReturn !== undefined
                        ? FormatMataUang(activeLoan?.yieldReturn)
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-800">Tenor</span>
                    <span className="font-semibold  text-gray-700">
                      {activeLoan?.tenor !== undefined
                        ? `${activeLoan?.tenor} bulan`
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-800">
                      Kategori Pinjaman
                    </span>
                    <span className="font-semibold  text-gray-700">
                      {activeLoan?.borrowingCategory !== undefined
                        ? `${activeLoan?.borrowingCategory}`
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-800">
                      Tanggal Pinjaman
                    </span>
                    <span className="font-semibold  text-gray-700">
                      {activeLoan?.date !== undefined
                        ? moment(activeLoan?.date).format("DD MMM YYYY")
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-800">Tujuan</span>
                    <span className="font-semibold  text-gray-700">
                      {activeLoan?.purpose ? `${activeLoan?.purpose}` : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-800">
                      Status Pinjaman
                    </span>
                    <span className="font-semibold  text-gray-700">
                      {console.log(activeLoan?.status)}
                      {activeLoan?.status !== undefined
                        ? statusLoanActive(activeLoan?.status)
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t-[1px]">
              <div className="py-3 px-5 rounded-b-md">
                <div className="flex gap-6 mb-2">
                  <div className="flex flex-col ">
                    <span className="text-[13px] text-[#194175] ">
                      Terdanai
                    </span>
                    <span className="text-sm text-[#194175] font-semibold">
                      {checkNaN(progress.toFixed(2))}%
                    </span>
                  </div>
                  <div className="border-r-[1px]"></div>
                  <div className="flex flex-col">
                    <span className="text-[13px] text-[#194175] ">
                      Pinjaman Terkumpul
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      {FormatMataUang(activeLoan?.totalFund)}
                    </span>
                  </div>
                </div>
                <span
                  role="progressbar"
                  aria-labelledby="ProgressLabel"
                  className="block rounded-full bg-gray-200"
                >
                  <span
                    className="block h-4 rounded-full bg-green-400 text-center text-[10px]/4"
                    style={{
                      width: `${isNaN(progress) ? "0" : progress}%`,
                    }}
                  >
                    <span className="font-bold text-white">
                      {isNaN(progress) ? "0.00%" : `${progress.toFixed(2)}%`}
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;
