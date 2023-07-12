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
            <span>akun anda sedang dalam tinjauan, silahkan tekan</span>

            <Link
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
              Akun anda belum diverifikasi, silahkan verifikasi terlebih dahulu{" "}
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
