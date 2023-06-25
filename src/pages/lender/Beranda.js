import React from "react";

import { Card } from "../../components/organism";
import { useSelector } from "react-redux";
import { ErrorMessage } from "../../components/atom";
import WarningMessage from "../../components/atom/warningMessage/WarningMessage";

const Beranda = () => {
  const { statusKYC } = useSelector((state) => state.auth);

  return (
    <>
      <div className="grid grid-cols-2 gap-8 max-w-7xl mx-auto">
        <Card />
        <WarningMessage />
        {/* <span>Status KYC : {statusKYC} </span> */}
      </div>
    </>
  );
};

export default Beranda;
