import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBorrowerStatusKYC } from "../../../service/Borrower/borrowerVerificationKYC";
import { setStatusKYC } from "../../../store/reducer/AuthReducer";

const StatusKYC = () => {
  const { statusKYC, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getStatusKYC = async () => {
    const response = await getBorrowerStatusKYC({ accessToken });
    dispatch(setStatusKYC(response));
  };

  useEffect(() => {
    getStatusKYC();
  }, [statusKYC, dispatch]);

  return (
    <div>
      <span>StatusKYC : {statusKYC} </span>
    </div>
  );
};

export default StatusKYC;
