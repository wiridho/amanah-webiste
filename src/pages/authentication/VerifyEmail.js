import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { verifyEmailAccount } from "../../service/authService";
import { generateDynamicLink } from "../../utils/Firebase";

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
    window.open(dynamicLink.shortLink, "_blank");
    console.log("dynamiclink", dynamicLink);
    // window.location.href = dynamicLink.shortLink;
  };

  useEffect(() => {
    dispatch(verifyEmailAccount({ userId, token }));
    setReady(true);
  }, []);

  return (
    <div>
      {ready ? (
        <div className="flex min-h-screen justify-center items-center">
          <h1>BERHASIL TERVERIVIKASI</h1>
          <h1>WELCOME </h1>
          <br />
          <button onClick={handleOpenInApp} className="bg-gray-700 p-2 rounded">
            Open in app
          </button>
          <button
            onClick={handleOpenInWeb}
            className="bg-slate-500 p-2 rounded"
          >
            Stay in browser
          </button>
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
