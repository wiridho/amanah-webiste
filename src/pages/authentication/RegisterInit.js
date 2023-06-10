import React from "react";
import { Link } from "react-router-dom";
import Lender from "../../assets/img/registerInit/lender2.png";
import Borrower from "../../assets/img/registerInit/borrower2.png";
import Logo_Amana from "../../assets/img/logo/LogoAmana2.svg";

const RegisterInit = () => {
  return (
    <div>
      <div className="relative md:min-h-screen bg-slate-100 font-inter ">
        <div className="container mx-auto p-4  ">
          <div className="flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-center items-center">
              <img
                src={Logo_Amana}
                className="w-20 h-20  p-2 rounded-full bg-primary"
                alt="LogoAmana"
              />
            </div>
            <div className="text-center pt-5">
              <p className="text-3xl text-[#013c50]">
                Cara Syariah yang Aman.
                <br />
                Memberi Pendanaan dan Mendapatkan Pembiayaan.
              </p>
            </div>
            {/* End Header */}

            {/* Content */}
            <div className=" pt-6 text-center">
              <h1 className="mb-2 mt-0 text-lg font-medium  text-[#013c50]">
                Pilih jenis akun kamu
              </h1>
              <p className="text-sm text-[#47443c] mb-4">
                Pengguna hanya bisa memiliki satu jenis akun
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className=" bg-white w-[220px] p-[30px] md:flex justify-center shadow-md rounded-lg">
                  <Link
                    to={{
                      pathname: "/register/lender",
                    }}
                  >
                    <img src={Lender} className="" alt="Lender_img" />
                    <h1 className="text-lg text-primary">Pemberi Dana</h1>
                    <p className="text-slate-500 md:text-xs">
                      Gabung sebagai <br /> pemberi Pembiayaan
                    </p>
                  </Link>
                </div>
                <div className=" bg-white w-[220px] p-[30px] md:flex justify-center shadow-md rounded-lg">
                  <Link
                    to={{
                      pathname: "/register/borrower",
                    }}
                  >
                    <img src={Borrower} className="" alt="Lender_img" />
                    <h1 className="text-lg text-primary ">Penerima Dana</h1>
                    <p className="text-slate-500 md:text-xs">
                      Gabung sebagai <br /> pemerima Pembiayaan
                    </p>
                  </Link>
                </div>
              </div>
              <div>
                <p className="text-secondary text-base mt-3">
                  Sudah memiliki akun?{" "}
                  <Link to="/login">
                    <span className="text-primary hover:text-[#155596cc]">
                      Masuk
                    </span>
                  </Link>
                </p>
              </div>
              <div className="pt-3">
                <p className="text-[#47443c] text-sm">
                  Amanah telah
                  <span className="font-bold text-[#47443c]">
                    {" "}
                    Berizin dan Diawasi{" "}
                  </span>
                  <span className="">oleh Otoritas Jasa Keuangan (OJK) </span>
                </p>
              </div>
            </div>
            {/* End Content */}

            {/* Footer */}
            <footer className="pt-24">
              <div className="w-full mx-auto max-w-screen-lg p-4 md:flex md:items-center md:justify-between text-[#113D52]">
                <span className="text-sm  sm:text-center">
                  © AMANAH Fintech Syariah 2023 . All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
                  <li>
                    <Link to="#" className="mr-4 hover:underline md:mr-6">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="mr-4 hover:underline md:mr-6">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="mr-4 hover:underline md:mr-6">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </footer>
          </div>
          {/* End Footer */}
        </div>
      </div>
    </div>
  );
};

export default RegisterInit;
