import React from "react";
import LOGO from "../../assets/img/logo/LogoAmana2.svg";
import { Link, useParams } from "react-router-dom";
import { validateContract } from "../../service/admin/adminService";
import { useEffect } from "react";
import { useState } from "react";
import { FormatMataUang } from "../../utils/FormatMataUang";
// return import { PaperClipIcon } from '@heroicons/react/20/solid'

const ValidasiKontrak = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const getValidateContract = async () => {
    const response = await validateContract({ id });
    setData(response);
  };

  useEffect(() => {
    (async () => {
      await getValidateContract();
    })();
  }, []);

  console.log("data", data);

  if (!data) {
    return (
      <section class="bg-white dark:bg-gray-900 ">
        <div class="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div class="flex flex-col items-center max-w-sm mx-auto text-center">
            <p class="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </p>
            <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Data not found
            </h1>
            <p class="mt-4 text-gray-500 dark:text-gray-400">
              The contract you are looking for doesn't exist. Here are some
              helpful links:
            </p>

            <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              {/* <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5 rtl:rotate-180"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                    />
                                </svg>

                                <span>Go back</span>
                            </button> */}

              <Link
                to={"/beranda"}
                class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              >
                Take me home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="flex items-center h-screen flex-col mt-32 font-nunito-sans">
      <div className="bg-slate-50 w-full p-4 text-gray-700 sm:px-8 md:px-12 lg:px-28 xl:px-44 flex justify-center">
        <div className="max-w-5xl w-full flex gap-4 items-center">
          <img
            src={LOGO}
            alt=""
            srcset=""
            className="bg-gray-700 p-4 rounded-xl"
          />
          <span className="text-sm sm:text-sm md:text-2xl lg:text-2xl xl:text-3xl font-bold">
            Validasi Kontrak Pinjaman / Pendanaan
          </span>
        </div>
      </div>

      <div className=" ">
        <div className="sm:p-8 md:p-12 lg:p-28 xl:p-44 max-w-7xl sm:pt-12 md:pt-12 lg:pt-12 xl:pt-12">
          <div className="px-4 sm:px-0 ">
            <h3 className="text-base font-semibold leading-7 text-gray-500">
              Kontrak digital ini dapat dijadikan sebagai bukti yang sah pada
              kontrak peminjaman yang telah disepakati oleh pihak peminjam dan
              pihak pemberi pinjaman. Kontrak ini berlaku efektif setelah pihak
              pendanaan telah melakukan pendanaan. Kontrak ini dibuat secara
              otomatis oleh sistem dan tidak memerlukan tanda tangan fisik.
            </h3>
            {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Personal details and application.
                        </p> */}
          </div>
          {!data ? (
            "loading..."
          ) : (
            <div className="mt-6 border-t border-gray-100 w-full">
              <dl className="divide-y divide-gray-100 w-full ">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 grid grid-cols-2">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Nama Peminjam
                  </dt>
                  <dd className="mt-1 text-end text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.name}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Jumlah Dana Pinjaman
                  </dt>
                  <dd className="mt-1 text-sm text-end leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {FormatMataUang(data?.amount)}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Keuntungan Pinjaman
                  </dt>
                  <dd className="mt-1 text-sm text-end leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {FormatMataUang(data?.yieldReturn)}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Kategori Pinjaman
                  </dt>
                  <dd className="mt-1 text-sm text-end leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.borrowingCategory}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Tujuan Pinjaman
                  </dt>
                  <dd className="mt-1 text-sm text-end leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.purpose}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Skema Pelunasan
                  </dt>
                  <dd className="mt-1 text-sm text-end leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.repaymentSchema}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Jadwal Pembayaran Tagihan
                  </dt>
                  <dd className="mt-1 text-sm text-end leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.repaymentDate?.map((item, index) => {
                      return <div key={index}>{item}</div>;
                    })}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Status Pinjaman
                  </dt>
                  <dd className="mt-1 text-sm text-end leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.status}
                  </dd>
                </div>
                <hr />
                <span className="font-semibold text-xl">Data Lenders</span>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Nama Pendanaan
                  </dt>
                  <dd className="mt-1 text-sm text-end leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.lenders?.[0]?.name}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Waktu Pendanaan
                  </dt>
                  <dd className="mt-1 text-sm text-end leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.lenders?.[0]?.date}
                  </dd>
                </div>
                {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    About
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    Fugiat ipsum ipsum deserunt culpa aute sint
                                    do nostrud anim incididunt cillum culpa
                                    consequat. Excepteur qui ipsum aliquip
                                    consequat sint. Sit id mollit nulla mollit
                                    nostrud in ea officia proident. Irure
                                    nostrud pariatur mollit ad adipisicing
                                    reprehenderit deserunt qui eu.
                                </dd>
                            </div> */}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidasiKontrak;
