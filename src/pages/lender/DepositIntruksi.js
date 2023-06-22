import React from "react";

const DepositIntruksi = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow ">
        <div className="flex flex-col gap-4">
          <h5 className="text-xl  font-medium text-gray-900 text-center">
            BCA
          </h5>
          <div className="flex items-center p-3 justify-between  border border-gray-200 rounded-md ">
            <div className="flex flex-col ">
              <span className="text-sm text-gray-500">Virtual Account</span>
              <span className="font-semibold">12345678910123131</span>
            </div>
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white font-semibold rounded-md ">
                Salin
              </button>
            </div>
          </div>

          <div className="text-sm  flex flex-col gap-4 p-3">
            <span className="font-medium">Petunjuk isi saldo:</span>
            <div className="flex flex-col gap-2 text-gray-500 text-base">
              <span className="flex items-center gap-2">
                <span className="">1.</span>
                Login ke
                <span className="font-semibold text-gray-700  ">m-BCA.</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="">2.</span>
                <div>
                  Pilih <span>M-transfer </span> {">"}{" "}
                  <span className="font-semibold text-gray-700">
                    Transfer BCA Virtual Account.{" "}
                  </span>
                </div>
              </span>

              <div className="flex items-start gap-2">
                <span className="">3.</span>
                <div>
                  <span className="flex flex-wrap">
                    Pastikan informasi yang tertera sudah benar dan masukan
                    jumlah saldo yang ingin diisi.
                  </span>
                </div>
              </div>

              <span className="flex items-center gap-2">
                <span className=" text-md">4.</span>
                Masukan pin m-BCA kamu dan pilih{" "}
                <span className="font-semibold text-gray-700">OK.</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="">5.</span>
                Ikuti petunjuk selanjutnya
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositIntruksi;
