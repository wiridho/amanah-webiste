import React, { useEffect } from "react";

import { BiUser } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { getProfileBorrower } from "../../service/Borrower/profile";
import { titleCase } from "../../utils/FormatTitleCase";
import { TruncateString } from "../../utils/Truncate";
import { FaUser } from "react-icons/fa";
import { FormatMataUang } from "../../utils/FormatMataUang";

const ProfileBorrower = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const { profile, load } = useSelector((state) => state.borrower);

  useEffect(() => {
    dispatch(getProfileBorrower({ accessToken }));
  }, []);

  const perfomanceBorrower = profile?.performance;

  const badgeVerified = () => {
    if (profile?.verified === true) {
      return (
        <span class="whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-sm text-green-700">
          Sudah verifikasi
        </span>
      );
    } else if (profile?.verified === false) {
      return (
        <span class="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-700">
          Belum verifikasi
        </span>
      );
    }
  };

  return (
    <div className="p-6 font-nunito-sans">
      {load ? (
        <span>Loading</span>
      ) : (
        <div className="sm:px-0 flex flex-col gap-3">
          <div className="">
            <div className="p-4  rounded-md border bg-white border-gray-200 flex gap-4 items-center shadow-md">
              <img
                className="rounded-md"
                src={`https://ui-avatars.com/api/?name=${profile?.name}&background=random&color=fff`}
                alt="imgProfile"
              />
              <div className="flex flex-col">
                <span className="font-semibold">
                  {TruncateString(titleCase(profile?.name), 20)}
                </span>
                <span>Penerima Dana</span>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-md border bg-white border-gray-200 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <FaUser size={20} />
              <span className="font-bold">Personal Information</span>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1 flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-gray-400">
                    Name
                  </span>
                  <span className="font-semibold text-[15px]  text-gray-800">
                    {profile?.name}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-gray-400">
                    Email
                  </span>
                  <span className="font-semibold text-[15px]  text-gray-800">
                    {profile?.email}
                  </span>
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-gray-400">
                    Phone Number
                  </span>
                  <span className="font-semibold text-[15px]  text-gray-800">
                    {profile?.phoneNumber}
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium text-sm text-gray-400">
                    Verifikasi Email
                  </span>
                  <span>{badgeVerified()} </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-md border bg-white border-gray-200 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-bold ">Performa Anda</span>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <span className=" font-medium text-sm text-gray-400">
                      Total biaya dipinjam
                    </span>
                    <span className="font-semibold text-[15px]  text-gray-800">
                      {FormatMataUang(
                        perfomanceBorrower?.borrowingRecord?.borrowedFund
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-gray-400">
                      Jumlah Total Peminjaman
                    </span>
                    <span className="font-semibold text-[15px]  text-gray-800">
                      {perfomanceBorrower?.borrowingRecord?.totalBorrowing}{" "}
                      Pinjaman
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <span className="font-medium text-sm text-gray-400">
                  Pelunasan Pinjaman
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 ">
                    <span>{perfomanceBorrower?.repayment?.earlier}</span>
                    <span className="font-semibold text-[15px]  text-gray-800">
                      Dipercepat
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span>{perfomanceBorrower?.repayment?.onTime}</span>
                    <span className="font-semibold text-[15px]  text-gray-800">
                      Tepat Waktu
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span>{perfomanceBorrower?.repayment?.late}</span>
                    <span className="font-semibold text-[15px]  text-gray-800">
                      Terlambat
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBorrower;
