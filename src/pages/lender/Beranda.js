import React from "react";

import { Card } from "../../components/organism";
import { useSelector } from "react-redux";

const Beranda = () => {
  const { roles, statusKYC } = useSelector((state) => state.auth);

  return (
    <>
      <div className="grid grid-cols-2 gap-8 max-w-7xl mx-auto">
        <Card />
        <span>Status KYC : {statusKYC} </span>
      </div>
    </>
  );
};

export default Beranda;
