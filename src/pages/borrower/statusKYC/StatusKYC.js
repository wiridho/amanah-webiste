import React from "react";
import { useSelector } from "react-redux";

const StatusKYC = () => {
  const { statusKYC } = useSelector((state) => state.auth);

  return (
    <div>
      <span>StatusKYC : {statusKYC} </span>
    </div>
  );
};

export default StatusKYC;
