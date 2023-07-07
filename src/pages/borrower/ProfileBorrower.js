import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileBorrower } from "../../service/Borrower/profile";
import { titleCase } from "../../utils/FormatTitleCase";
import { TruncateString } from "../../utils/Truncate";

const ProfileBorrower = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.borrower);

  useEffect(() => {
    dispatch(getProfileBorrower({ accessToken }));
  }, []);

  const perfomanceBorrower = profile?.performance;

  console.log(perfomanceBorrower);
  return (
    <div className="p-6 font-nunito-sans">
      <div className="sm:px-0 flex flex-col gap-3">
        <div className="p-4 rounded-md border bg-white border-gray-200 flex gap-4 items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${profile?.name}`}
            alt="imgProfile"
          />
          <div className="flex flex-col">
            <span className="font-semibold">
              {TruncateString(titleCase(profile?.name), 20)}
            </span>
            <span>Penerima Dana</span>
          </div>
        </div>
        <div className="p-4 rounded-md border bg-white border-gray-200">
          <span className="font-semibold">Personal Information</span>
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <div className="flex flex-col">
                <span>Name</span>
                <span>Peminjam 1</span>
              </div>
              <div className="flex flex-col">
                <span>Email</span>
                <span>peminjam1@yopmai.com</span>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex flex-col">
                <span>Phone Number</span>
                <span>08391203912</span>
              </div>
              <div className="flex flex-col">
                <span>Akun Verifikasi</span>
                <span>True</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-md border bg-white border-gray-200">
          <span className="font-semibold">Performa Anda</span>
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <div className="flex flex-col">
                <span className="">Catatan Peminjaman</span>
                <span className=" text-gray-500">Total biaya dipinjam </span>
                <span className="">Rp1.000.000</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Jumlah Total Peminjaman</span>
                <span className="">1 Peminjam</span>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex flex-col">
                <span>Pembayaran Kembali</span>
                <span>Dipercepat</span>
                <span>0</span>
              </div>
              <div className="flex flex-col">
                <span>Tepat Waktu</span>
                <span>1</span>
              </div>
              <div className="flex flex-col">
                <span>Terlambat</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBorrower;
