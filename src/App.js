import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardLender from "./components/template/DashboardLender";

import Beranda from "./pages/lender/Beranda";
import Borrower from "./pages/borrower/Beranda";
import RegisterInit from "./pages/authentication/RegisterInit";
import ProtectRoute from "./components/protectRoute/ProtectRoute";
import Lending from "./pages/public/Lending";
import VerifyEmail from "./pages/authentication/VerifyEmail";
import Register from "./pages/authentication/Register";
import RegisterVerifySucess from "./pages/authentication/RegisterVerifySuccess";
import VerifyLogin from "./pages/authentication/VerifyLogin";
import Login from "./pages/authentication/Login";
import DashboardBorrower from "./components/template/DashboardBorrower";
import Pendanaan from "./pages/lender/Pendanaan";
import Profile from "./pages/lender/Profile";
import Kyc from "./pages/verifikasiKyc/kyc";
import Status_KYC from "./pages/lender/statusKYC/status_KYC";
import DetailPendanaan from "./pages/lender/DetailPendanaan";
import Deposit from "./pages/lender/Deposit";
import Portofolio from "./pages/lender/Portofolio";
import DepositIntruksi from "./pages/lender/DepositIntruksi";

// Withdraw
import WithdrawListBank from "./pages/lender/withdraw/WithdrawListBank";
import WithdrawTambahBank from "./pages/lender/withdraw/WithdrawTambahBank";
import Withdraw from "./pages/lender/withdraw/Withdraw";
import RiwayatTransaksi from "./pages/lender/RiwayatTransaksi";
import PreviewKontrak from "./pages/lender/Pendanaan/PreviewKontrak";
import Tes from "./pages/lender/deposit/tes";

function App() {
  const { roles, is_auth } = useSelector((state) => state.auth);
  let is_public = is_auth ? false : true;

  return (
    <BrowserRouter>
      <Routes>
        {roles === "lender" && (
          // Dahboard Lender
          <>
            <Route
              path="*"
              element={<Navigate to={"/funder"} replace={true} />}
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
              <Route index element={<Beranda />} />
              <Route path="pendanaan" element={<Pendanaan />} />
              <Route path="pendanaan/:loanId" element={<DetailPendanaan />} />
              <Route
                path="pendanaan/preview-kontrak"
                element={<PreviewKontrak />}
              />

              {/* Withdraw */}
              <Route path="withdraw" element={<Withdraw />} />
              <Route path="withdraw/listBank" element={<WithdrawListBank />} />
              <Route
                path="withdraw/tambah/bank"
                element={<WithdrawTambahBank />}
              />
              <Route path="riwayat-transaksi" element={<RiwayatTransaksi />} />
              {/* Deposit */}
              <Route path="deposit" element={<Deposit />} />
              <Route path="tes" element={<Tes />} />
              <Route path="deposit/intruksi" element={<DepositIntruksi />} />

              <Route path="portofolio" element={<Portofolio />} />
              <Route path="profile" element={<Profile />} />

              {/* KYC */}
              <Route path="kyc" element={<Kyc />} />
              <Route path="kyc/status" element={<Status_KYC />} />
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
              <Route index element={<Borrower />} />
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
