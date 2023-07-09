import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { verifyEmailAccount } from "../../service/authentication/authService";
import { generateDynamicLink } from "../../utils/Firebase";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Button } from "../../components/atom";

const VerifyEmail = () => {
  const { userId, token } = useParams();
  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* 
     *TODO: handle button open in app and stay in browser
     - If user click open in app, open app
     - If user click stay in browser, redirect to login website
    */

  const handleOpenInWeb = () => {
    console.log("stay in browser");
    navigate("/login");
  };

  //  If user click open in app, open app
  // *! ABAIKAN DULU INI
  const handleOpenInApp = async () => {
    console.log("open in app");
    const dynamicLink = await generateDynamicLink(token, userId);
    window.open(dynamicLink?.shortLink, "_blank");
    console.log("dynamiclink", dynamicLink);
    // window.location.href = dynamicLink.shortLink;
  };

  useEffect(() => {
    dispatch(verifyEmailAccount({ userId, token }));
    setReady(true);
  }, [dispatch, userId, token]);

  return (
    <div>
      {ready ? (
        <div className="flex min-h-screen justify-center items-center">
          {/* Card Blog */}
          <div className="max-w-[35rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            {/* Grid */}
            {/* Card */}
            <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl ">
              <div className="h-52 flex flex-col justify-center items-center bg-green-400 rounded-t-xl">
                <BsFillCheckCircleFill size={100} className="text-white" />
              </div>
              <div className="p-4 md:p-6">
                {/* <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
                Atlassian API
              </span> */}
                <h3 className="text-xl font-semibold text-gray-800">
                  Verifikasi Email Sukses
                </h3>
                <p className="mt-3 text-gray-500 ">
                  Selamat proses verifikasi email anda telah berhasil dilakukan.
                </p>
              </div>
              <div className="mt-auto flex  gap-5 p-4 md:p-6 justify-center ">
                <Button
                  type={"button"}
                  onClick={handleOpenInApp}
                  className={`px-5 py-2.5 bg-white-500 hover:bg-slate-100 border border-gray-200 rounded w-full `}
                >
                  Buka Aplikasi
                </Button>
                <Button
                  type={"button"}
                  onClick={handleOpenInWeb}
                  className={`px-5 py-2.5 bg-blue-500 hover:bg-blue-700 text-white font-semibold border-gray-200 rounded w-full `}
                >
                  Tetap di browser
                </Button>
              </div>
            </div>
            {/* End Card */}
            {/* End Grid */}
          </div>
          {/* End Card Blog */}
        </div>
      ) : (
        <div>
          <h1>LOADING ....</h1>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
