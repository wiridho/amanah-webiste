import React, { useEffect, useState } from "react";
import Card from "../../components/molekul/card-otp/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// function slice
import { resendLoginOtp, verifyLoginOtp } from "../../service/authService";

const VerifyLogin = () => {
  const [otp, setOtp] = useState("");
  //dispatch
  const dispatch = useDispatch();
  //navigate
  const navigate = useNavigate();

  const data = useSelector((state) => state.auth.data);
  const { messageError, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      navigate("/homepage");
    }
  }, [navigate, isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyLoginOtp({ email: data.email, otp: otp }));
  };

  const handleResend = () => {
    console.log("button resend click");
    dispatch(resendLoginOtp({ email: data.email }));
  };

  return (
    <div className="">
      <div>
        <Card
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
