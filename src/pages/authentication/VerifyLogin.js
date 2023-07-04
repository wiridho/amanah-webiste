import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CardOtp } from "../../components/molekul";

// Service
import {
  resendLoginOtp,
  verifyLoginOtp,
} from "../../service/authentication/authService";

const VerifyLogin = () => {
  const [otp, setOtp] = useState("");
  const { data } = useSelector((state) => state.auth);
  let body = { email: data.email, otp: otp };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyLoginOtp({ body, navigate }));
  };

  const handleResend = () => {
    dispatch(resendLoginOtp(body));
  };

  return (
    <div>
      <CardOtp
        data={data}
        setOtp={setOtp}
        otp={otp}
        handleSubmit={onSubmit}
        handleResend={handleResend}
      />
    </div>
  );
};

export default VerifyLogin;
