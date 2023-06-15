import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardLender from "./components/template/DashboardLender";
import Beranda from "./pages/lender/Beranda";
import RegisterInit from "./pages/authentication/RegisterInit";
import ProtectRoute from "./components/protect_route/ProtectRoute";
import Lending from "./pages/public/Lending";
import VerifyEmail from "./pages/authentication/VerifyEmail";
import Register from "./pages/authentication/Register";
import RegisterVerifySucess from "./pages/authentication/RegisterVerifySuccess";
import VerifyLogin from "./pages/authentication/VerifyLogin";
import Login from "./pages/authentication/Login";
import DashboardBorrower from "./components/template/DashboardBorrower";
import Pendanaan from "./pages/lender/Pendanaan";
import WebcamCapture from "./pages/verifikasi-kyc/VerifikasiKYC2";
import Profile from "./pages/lender/Profile";
import Kyc from "./pages/verifikasi-kyc/kyc";
import DetailPendanaan from "./pages/lender/DetailPendanaan";
function App() {
  const { roles, is_auth } = useSelector((state) => state.auth);
  console.log(is_auth);
  console.log(roles);

  let is_public = is_auth ? false : true;
  return (
    <BrowserRouter>
      <Routes>
        {roles === "lender" && (
          // Dahboard Lender
          <>
            <Route
              path="*"
              element={<Navigate to={"/funder/beranda"} replace={true} />}
            />
            <Route
              path="/"
              element={<Navigate to={"/funder"} replace={true} />}
            />

            <Route
              path="funder"
              element={
                <ProtectRoute
                  valid={is_auth}
                  to={"/login"}
                  children={<DashboardLender />}
                />
              }
            >
              {/* <Route path="" element={<Beranda />} /> */}
              <Route path="beranda" element={<Beranda />} />
              <Route path="pendanaan" element={<Pendanaan />} />
              <Route path="pendanaan/:loanId" element={<DetailPendanaan />} />
              <Route path="profile" element={<Profile />} />
              <Route path="kyc" element={<Kyc />} />
            </Route>
          </>
        )}
        {roles === "borrower" && (
          // Dashboard Borrower
          <>
            <Route
              path="*"
              element={<Navigate to={"/borrower"} replace={true} />}
            />
            <Route
              path="/"
              element={<Navigate to={"/borrower"} replace={true} />}
            />
            {/* <Route
              path="borrower"
              element={
                <ProtectRoute
                  valid={is_auth}
                  to={"/login"}
                  children={"Borrower Dashboard"}
                />
              }
            /> */}
            <Route
              path="borrower"
              element={
                <ProtectRoute
                  valid={is_auth}
                  to={"/login"}
                  children={<DashboardBorrower />}
                />
              }
            >
              {/* <Route path="" element={<Beranda />} /> */}
              {/* <Route path="beranda" element={<Beranda />} /> */}
              {/* <Route path="portofolio" element={<Portofolio />} />
              <Route path="pendanaan" element={<Pendanaan />} />
              <Route path="bantuan" element={<Bantuan />} /> */}
            </Route>
          </>
        )}

        {/* Public Route */}
        <Route path="*" element={<Navigate to={"/login"} replace={true} />} />

        <Route
          path="/"
          element={<ProtectRoute valid={is_public} children={<Lending />} />}
        />

        <Route
          path="/register-init"
          element={
            <ProtectRoute valid={is_public} children={<RegisterInit />} />
          }
        />

        <Route
          path="/register/:roles"
          element={<ProtectRoute valid={is_public} children={<Register />} />}
        />
        <Route
          path="/authentication/verification/email/:userId/:token"
          element={
            <ProtectRoute valid={is_public} children={<VerifyEmail />} />
          }
        />
        <Route
          path="/register/success"
          element={
            <ProtectRoute
              valid={is_public}
              children={<RegisterVerifySucess />}
            />
          }
        />
        <Route
          path="/login"
          element={<ProtectRoute valid={is_public} children={<Login />} />}
        />
        <Route
          path="/verifylogin"
          element={
            <ProtectRoute valid={is_public} children={<VerifyLogin />} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
