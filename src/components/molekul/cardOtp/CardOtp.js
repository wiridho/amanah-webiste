import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../store/reducer/AuthReducer";

import OtpInput from "react-otp-input";
import OtpTimer from "otp-timer";

import Verifikasi from "../../../assets/img/Verifikasi/verifikasi.png";

// Component
import { Button, Message } from "../../atom";

const CardOtp = ({ setOtp, otp, handleSubmit, handleResend, data }) => {
  const dispatch = useDispatch();

  const { message, success } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="h-screen flex justify-center items-center font-nunito-sans">
        <div className="rounded-lg overflow-hidden shadow-md bg-gray-100">
          <div className="p-8 flex flex-col justify-center items-center gap-8">
            <div className="flex flex-col justify-center items-center gap-4">
              <img
                src={Verifikasi}
                style={{ width: 130, height: 130 }}
                alt=""
              />
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
            </form>
            <div className="w-full">
              <Button
                type="submit"
                className=" bg-blue-500 px-5 py-2.5 hover:bg-blue-700 w-full text-white"
              >
                Verifikasi OTP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOtp;
