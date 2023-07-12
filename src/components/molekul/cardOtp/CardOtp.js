import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../store/reducer/AuthReducer";

import OtpInput from "react-otp-input";
import OtpTimer from "otp-timer";

import Verifikasi from "../../../assets/img/Verifikasi/verifikasi.png";

// Component
import { Button, Loading, Message } from "../../atom";
import { useNavigate } from "react-router-dom";

const CardOtp = ({ setOtp, otp, handleSubmit, data, handleResend }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, success, load } = useSelector((state) => state.auth);

  return (
    <div className="h-screen flex flex-col justify-center items-center font-nunito-sans">
      <div>
        <div className="mb-2">
          <Message
            status={success}
            message={message}
            visible={message !== null && !success ? true : false}
            onClose={() => {
              dispatch(setMessage(null));
            }}
          />
        </div>
        <div className="p-8 flex flex-col justify-center items-center gap-8 bg-white rounded-lg overflow-hidden shadow-md">
          <div className="flex flex-col justify-center items-center gap-4">
            <img src={Verifikasi} style={{ width: 130, height: 130 }} alt="" />
            <span className="text-2xl text-center font-semibold">
              Verifikasi Email
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-gray-500">
                Kami telah mengirimkan kode konfirmasi ke email
              </span>
              <strong className="text-black text-center">{data.email}</strong>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="">
              <OtpInput
                inputType="number"
                value={otp}
                onChange={setOtp}
                numInputs={5}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                containerStyle={"flex gap-2"}
                inputStyle={{
                  width: "68px",
                  height: "68px",
                  fontWeight: "500",
                  fontSize: "40x",
                  caretColor: "#fff",
                  border: "1px solid #d8d8d8",
                  borderRadius: "6px",
                  margin: "0 1px",
                  background: "#ffffff",
                  fontSize: "16px",
                }}
                focusStyle={{
                  border: "1px solid #4c9aff",
                  outline: "none",
                }}
              />
            </div>
            <div className="w-full mt-4">
              <Button
                type="submit"
                className=" bg-blue-600 px-5 py-2.5 hover:bg-blue-700 w-full text-white"
              >
                {load ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loading />
                    <span>Loading </span>
                  </div>
                ) : (
                  "Verifikasi OTP"
                )}
              </Button>
            </div>
          </form>
          <div className="pt-2 px-4">
            <OtpTimer
              background={"#fff"}
              textColor={"#808080"}
              buttonColor={"#146C94"}
              minutes={1}
              seconds={0}
              text={"Kirim ulang OTP dalam waktu"}
              ButtonText="Kirim ulang OTP!"
              resend={handleResend}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOtp;
