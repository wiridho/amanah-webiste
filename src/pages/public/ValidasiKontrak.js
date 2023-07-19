import React from "react";
import { useParams } from "react-router-dom";

const ValidasiKontrak = () => {
  const { id } = useParams();
  return <div>ValidasiKontrak {id}</div>;
};

export default ValidasiKontrak;
