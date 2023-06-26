import { useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import OtpTimer from "otp-timer";

// Component
import { Button, ErrorMessage } from "../../atom";

const Card = ({
  setOtp,
  otp,
  handleSubmit,
  handleResend,
  data,
  visible,
  setVisible,
}) => {
  const { message_error } = useSelector((state) => state.auth);
  return (
    <>
      <div>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-slate-200 font-inter p-2">
          <div className="relative bg-white px-3 pt-8 pb-8 sm:px-6 sm:pt-10 sm:pb-9 shadow mx-auto w-full max-w-md rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-10">
              <div className="flex flex-col text-center">
                <div className="font-medium text-3xl">
                  <p>Verifikasi Email</p>
                </div>
                <div className="flex flex-row text-sm font-normal text-gray-600">
                  <p>
                    Kami telah mengirimkan kode konfirmasi ke email{" "}
                    <strong className="text-black">{data.email}</strong>
                  </p>
                </div>
                <div>
                  {visible && (
                    <ErrorMessage
                      message={message_error}
                      onClose={() => setVisible(false)}
                    />
                  )}
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-10">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      <OtpInput
                        inputType="number"
                        shouldAutoFocus={true}
                        value={otp}
                        onChange={setOtp}
                        numInputs={5}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={
                          "w-full h-full flex justify-center gap-x-3"
                        }
                        inputStyle={{
                          background: "#6366f1",
                          border: "none",
                          fontWeight: "500",
                          borderRadius: "8px",
                          width: "55px",
                          height: "55px",
                          fontSize: "20px",
                          caretColor: "#fff",
                          color: "#fff",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        focusStyle={{
                          border: "1px solid #CFD3DB",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div className="px-2 max-w-sm mx-auto w-full">
                      <Button
                        type="submit"
                        className="bg-indigo-500 mx-auto w-full text-white"
                      >
                        Verifikasi OTP
                      </Button>
                    </div>
                  </div>
                </form>
                <div>
                  {/* <div className="pt-2 px-4">
                    <OtpTimer
                      background={"#fff"}
                      textColor={"#808080"}
                      buttonColor={"#146C94"}
                      minutes={2}
                      seconds={0}
                      text={"Kirim ulang OTP dalam waktu"}
                      ButtonText="Kirim ulang OTP!"
                      resend={handleResend}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <div className="flex justify-center items-center h-screen">
            <div className="block max-w-md px-10 py-8 md:w-1/2 bg-white border-gray-200 shadow-md rounded-lg">
              <div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-90">
                  LOGO
                </h5>
                <p className="text-2xl text-[#333333] py-5 font-bold text-center">
                  Masukan kode OTP
                </p>
                <p className="text-center">
                  Kami telah mengirimkan kode konfirmasi ke 'email'
                </p>
              </div>
              <form className="" onSubmit={handleSubmit}>
                <div>
                  <OtpInput
                    containerStyle={"flex justify-between my-6"}
                    inputStyle={
                      "!w-[50px] h-[50px] rounded-md border-none bg-primary"
                    }
                    value={otp}
                    onChange={setOtp}
                    numInputs={5}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <Button type="submit" className="w-full mt-2 bg-primary">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
