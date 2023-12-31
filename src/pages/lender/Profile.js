import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileLender } from "../../service/lender/profile";
import { Loading } from "../../components/atom";
import { badgeVerified } from "../../utils/Lender/lender";

export default function Example() {
  const { accessToken } = useSelector((state) => state.auth);
  const { profile, load } = useSelector((state) => state.lender);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileLender({ accessToken }));
  }, []);

  return (
    <div className="">
      {load ? (
        <div className="h-screen flex justify-center items-center gap-3">
          <Loading className={"w-6 h-6 text-blue-500"} />
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
                  {badgeVerified(profile?.verified)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
