import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Protect Route
import ProtectRoute from "./components/protectRoute/ProtectRoute";

// Public
import Beranda from "./pages/lender/Beranda";
import RegisterInit from "./pages/authentication/RegisterInit";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import VerifyEmail from "./pages/authentication/VerifyEmail";
import Lending from "./pages/public/Lending";
import RegisterVerifySucess from "./pages/authentication/RegisterVerifySuccess";
import VerifyLogin from "./pages/authentication/VerifyLogin";

// Lender
import DashboardLender from "./components/template/DashboardLender";
import Pendanaan from "./pages/lender/Pendanaan";
import Profile from "./pages/lender/Profile";
import Kyc from "./pages/verifikasiKyc/kyc";
import Status_KYC from "./pages/lender/statusKYC/status_KYC";
import DetailPendanaan from "./pages/lender/DetailPendanaan";
import Deposit from "./pages/lender/Deposit";
import Portofolio from "./pages/lender/Portofolio";
import DepositIntruksi from "./pages/lender/DepositIntruksi";
import WithdrawListBank from "./pages/lender/withdraw/WithdrawListBank";
import WithdrawTambahBank from "./pages/lender/withdraw/WithdrawTambahBank";
import Withdraw from "./pages/lender/withdraw/Withdraw";
import RiwayatTransaksi from "./pages/lender/RiwayatTransaksi";
import PreviewKontrak from "./pages/lender/Pendanaan/PreviewKontrak";

// Borrower
import Borrower from "./pages/borrower/Beranda";
import DashboardBorrower from "./components/template/DashboardBorrower";
import KycBorrower from "./pages/verifikasiKyc/KycBorrower";
import ProfileBorrower from "./pages/borrower/ProfileBorrower";
import AjukanPinjaman from "./pages/borrower/pengajuanPinjaman/AjukanPinjaman";
import KonfirmasiPinjaman from "./pages/borrower/pengajuanPinjaman/KonfirmasiPinjaman";
import StatusKYC from "./pages/borrower/statusKYC/StatusKYC";
import ListBankBorrower from "./pages/borrower/bank/ListBankBorrower";
import AddBankBorrower from "./pages/borrower/bank/AddBankBorrower";
import PreviewKontrakPeminjaman from "./pages/borrower/PreviewKontrakPeminjaman";
import Pembayaran from "./pages/borrower/Pembayaran";
import RiwayatPeminjaman from "./pages/borrower/RiwayatPeminjaman";
import KonfirmasiPencairanPinjaman from "./pages/borrower/pencairanPinjaman/KonfirmasiPencairanPinjaman";

// Admin
import DashboardAdmin from "./components/template/DashboardAdmin";
import HomeAdmin from "./pages/admin/Home";
import LoanAdmin from "./pages/admin/Loans";

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
              <Route path="kyc" element={<KycBorrower />} />
              <Route path="kyc/status" element={<StatusKYC />} />
              <Route path="pengajuan-pinjaman" element={<AjukanPinjaman />} />
              <Route path="riwayat-pinjaman" element={<RiwayatPeminjaman />} />

              <Route
                path="konfirmasi-pinjaman"
                element={<KonfirmasiPinjaman />}
              />
              <Route
                path="konfirmasi-pencairan"
                element={<KonfirmasiPencairanPinjaman />}
              />

              <Route
                path="preview-kontrak"
                element={<PreviewKontrakPeminjaman />}
              />
              <Route path="pembayaran" element={<Pembayaran />} />
              <Route path="profile" element={<ProfileBorrower />} />

              <Route path="list-bank" element={<ListBankBorrower />} />
              <Route path="add-bank" element={<AddBankBorrower />} />
            </Route>
          </>
        )}

        {roles === "admin" && (
          // Dashboard Borrower
          <>
            <Route
              path="*"
              element={<Navigate to={"/admin"} replace={true} />}
            />
            <Route
              path="/"
              element={<Navigate to={"/admin"} replace={true} />}
            />
            <Route
              path="admin"
              element={
                <ProtectRoute
                  valid={is_auth}
                  to={"/login"}
                  children={<DashboardAdmin />}
                />
              }
            >
              <Route index element={<HomeAdmin />} />
              <Route path="loans" element={<LoanAdmin />} />
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
