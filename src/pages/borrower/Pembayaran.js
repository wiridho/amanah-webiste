import React from "react";
import { Button } from "../../components/atom";

const Pembayaran = () => {
  return (
    <div className="h-screen flex justify-center items-center font-nunito-sans">
      <div className="max-w-sm w-full rounded-md shadow bg-white">
        <div className="p-5">
          <div className="flex flex-col gap-5">
            {/* <span className="text-lg text-center font-semibold">
              Pembayaran
            </span> */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col text-center	bg-blue-100 p-3 rounded-md">
                <span className="text-blue-600">Tagihan bulan ini</span>
                <span className="text-2xl font-semibold text-blue-600">
                  Rp1.000.000
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span>Sisa Pembayaran</span>
                  <span>Rp1.000.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Jatuh Tempo</span>
                  <span>05 Juli 2023</span>
                </div>
              </div>
            </div>
            <div className="">
              <Button
                className={`px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white w-full`}
              >
                Pilih Bank
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pembayaran;
