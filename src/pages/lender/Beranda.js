import React, { useEffect, useState } from "react";

import { CardBalance } from "../../components/organism";
import { useSelector } from "react-redux";
import { ErrorMessage } from "../../components/atom";
import WarningMessage from "../../components/atom/warningMessage/WarningMessage";

const Beranda = () => {
  const [visible, setVisible] = useState(true);
  const { statusKYC } = useSelector((state) => state.auth);

  const alertStatusKYC = () => {
    if (statusKYC === "not verified") {
      return (
        <ErrorMessage
          message={"Anda belum melakukan verifikasi akun!."}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      );
    } else if (statusKYC === "pending") {
      return (
        <WarningMessage
          message={"Akun anda sedang diperiksa, mohon ditunggu."}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-8 max-w-7xl mx-auto">
        <CardBalance />
        {alertStatusKYC()}
      </div>
    </>
  );
};

export default Beranda;
