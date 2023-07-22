import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileLender } from "../../service/lender/profile";
import { Link } from "react-router-dom";
import { Loading } from "../../components/atom";

export default function Example() {
  const { accessToken } = useSelector((state) => state.auth);
  const { profile, load } = useSelector((state) => state.lender);
  const dispatch = useDispatch();

  const badgeVerified = () => {
    if (profile?.verified === false) {
      return (
        <span class="whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-sm text-green-700">
          Sudah verifikasi
        </span>
      );
    } else if (profile?.verified === true) {
      return (
        <span class="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-700">
          Belum verifikasi, silahkan verifikasi{" "}
          <Link to={"/funder/kyc"} className="underline">
            disini!
          </Link>
        </span>
      );
    }
  };

  useEffect(() => {
    dispatch(getProfileLender({ accessToken }));
  }, []);

  return (
    <div className="">
      {load ? (
        <div className="h-screen flex justify-center items-center gap-3">
          <Loading className={"w-8 h-8 text-blue-500"} />{" "}
          <span className="text-lg">Loading</span>
        </div>
      ) : (
        <div className="p-6 bg-white">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            <img
              src={`https://ui-avatars.com/api/?name=${profile?.name}`}
              alt="imgProfile"
            />
            Informasi Pendana
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Nama Lengkap
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {profile?.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Alamat Email
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {profile?.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Nomor Telepon
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {profile?.phoneNumber}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Verifikasi KYC
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {badgeVerified()}
                  {/* {`${
                    profile?.verified === true ? (
                      "Sudah Terverifikasi"
                    ) : (
                      <div>
                        <span>Silahkan Verifikasi Ke</span>
                        <Link to={"/lender/kyc"}>Halaman Ini</Link>
                      </div>
                    )
                  }`} */}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
