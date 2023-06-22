import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfileLender } from "../../service/lender/profile";

export default function Example() {
  const [profile, setProfile] = useState("");
  const [urlProfile, setUrlProfile] = useState("");
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const response = await getProfileLender({ accessToken });
      console.log(response);
      setProfile(response);
      setUrlProfile(response?.profileImg?.data);
    })();
  }, [accessToken]);

  console.log(urlProfile);

  return (
    <div className="bg-white p-6">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          <img src={`https://ui-avatars.com/api/?name=John`} alt="imgProfile" />
          Applicant Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile?.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile?.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile?.phoneNumber}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Verified
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile?.verified}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
