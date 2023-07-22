import React, { useState } from "react";
import { useSelector } from "react-redux";
import WarningMessage from "../../atom/warningMessage/WarningMessage";
import { Link } from "react-router-dom";
import { Message } from "../../atom";

const StatusKYC = ({ component }) => {
  const { statusKYC } = useSelector((state) => state.auth);
  const { roles } = useSelector((state) => state.auth);

  if (statusKYC === "pending") {
    return (
      <WarningMessage
        message={
          <div>
            <span>
              Akun anda sedang{" "}
              <span className="font-semibold">dalam tinjauan</span> , mohon
              ditunggu hingga verifikasi kyc disetujui oleh admin. Lihat status
            </span>

            <Link
              className="underline"
              to={`/${roles === "lender" ? "funder" : "borrower"}/kyc/status`}
            >
              {" "}
              disini!
            </Link>
          </div>
        }
        visible={true}
        close={false}
      />
    );
  } else if (statusKYC === "not verified") {
    return (
      <Message
        status={false}
        message={
          <div>
            <span>
              Maaf, akun Anda{" "}
              <span className="font-bold">belum diverifikasi</span>. Untuk
              menggunakan layanan kami, Anda perlu melakukan verifikasi terlebih
              dahulu{" "}
            </span>
            <Link
              className={"underline font-semibold"}
              to={`/${roles === "lender" ? "funder" : "borrower"}/kyc`}
            >
              disini!
            </Link>
          </div>
        }
        visible={true}
        close={false}
      />
    );
  } else {
    return <>{component}</>;
  }
};

export default StatusKYC;
