import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/molekul/cardOtp/Card";

// Component
import { ErrorMessage } from "../../components/atom";

// Service
import {
  resendLoginOtp,
  verifyLoginOtp,
} from "../../service/authentication/authService";

const VerifyLogin = () => {
  const [otp, setOtp] = useState("");
  const [visible, setVisible] = useState(false);

  //dispatch
  const dispatch = useDispatch();
  //navigate
  const navigate = useNavigate();

  const { data, message_error } = useSelector((state) => state.auth);
  console.log(data);
  let body = { email: data.email, otp: otp };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(body);
    dispatch(verifyLoginOtp({ body, navigate, setVisible }));
  };

  const handleResend = () => {
    console.log("button resend click");
    dispatch(resendLoginOtp(body));
  };

  return (
    <div className="">
      <div>
        <Card
          visible={visible}
          setVisible={setVisible}
          data={data}
          setOtp={setOtp}
          otp={otp}
          handleSubmit={onSubmit}
          handleResend={handleResend}
        />
      </div>
    </div>
  );
};

export default VerifyLogin;
