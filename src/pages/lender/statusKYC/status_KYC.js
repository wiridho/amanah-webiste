import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLenderStatusKYC } from "../../../service/lender/lenderVerificationKYC";
import { setStatusKYC } from "../../../store/reducer/AuthReducer";
import { Link } from "react-router-dom";

const Status_KYC = () => {
  const dispatch = useDispatch();
  const { accessToken, statusKYC } = useSelector((state) => state.auth);

  const getStatusKYC = async () => {
    try {
      const response = await getLenderStatusKYC({ accessToken });
      dispatch(setStatusKYC(response?.data?.kyc));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatusKYC();
  }, []);

  if (statusKYC === "pending") {
    return (
      <span>
        Pending : Pengajuan sedang dalam proses. Silahkan ke
        <Link to={"/funder/beranda"}>Halaman Utama</Link>
      </span>
    );
  }

  if (statusKYC === "verified") {
    return <div>Sudah Verified</div>;
  }

  return (
    <div>
      <span>status kyc kamu : {statusKYC}</span>
    </div>
  );
};

export default Status_KYC;
