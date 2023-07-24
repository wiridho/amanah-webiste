import React from "react";
import LOGO from "../../assets/img/logo/LogoAmana2.svg";
import { Link, useParams } from "react-router-dom";
import { validateContract } from "../../service/admin/adminService";
import { useEffect } from "react";
import { useState } from "react";
import { FormatMataUang } from "../../utils/FormatMataUang";
import { Loading } from "../../components/atom";
import ErrorPage from "./ErrorPage";

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

  if (!data) {
    return <ErrorPage />;
  }

  return (
    <div className="flex items-center h-screen flex-col mt-32 font-nunito-sans">
      <div className="bg-slate-50 w-full p-4 text-gray-700 sm:px-8 md:px-12 lg:px-28 xl:px-44 flex justify-center">
        <div className="max-w-5xl w-full flex gap-4 items-center">
          <img src={LOGO} alt="" className="bg-gray-700 p-4 rounded-xl" />
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
          </div>
          {!data ? (
            <div className="h-sreen flex justify-center items-center">
              <div className="flex items-center gap-3">
                <Loading className={"w-5 h-5 text-blue-500"} />
                <span>Loading</span>
              </div>
            </div>
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
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidasiKontrak;
