import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPassChange,
  forgotPassRequest,
  handleLogin,
  handleLoginAdmin,
  handleRegister,
  resendLoginOtp,
  resendRegisterVerify,
  verifyLoginOtp,
} from "../../service/authentication/authService";
import jwtDecode from "jwt-decode";
import { verificationBorrowerKYC } from "../../service/Borrower/borrowerVerificationKYC";

const initialState = {
  success: false,
  load: false,
  error: false,

  data: null,
  accessToken: null,
  refreshToken: null,
  message: null,
  statusKYC: null,

  // buat private route
  is_auth: false,
  roles: "",
};

const authSlice = createSlice({
  name: "authentication/login",
  initialState,
  reducers: {
    setStatusKYC(state, data) {
      state.statusKYC = data.payload;
    },
    setMessage(state, data) {
      state.message = data.payload;
    },
    setSuccess(state, data) {
      state.success = data.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Handle Register
      .addCase(handleRegister.pending, (state) => {
        state.load = true;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      })
      // Handle Verify Account via email
      .addCase(resendRegisterVerify.pending, (state) => {
        state.load = true;
      })
      .addCase(resendRegisterVerify.fulfilled, (state) => {
        state.load = true;
        state.error = false;
      })
      .addCase(resendRegisterVerify.rejected, (state) => {
        state.load = false;
        state.error = true;
      })
      // Handle Login
      .addCase(handleLogin.pending, (state) => {
        state.load = true;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.load = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.load = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      // Handle login admin
      .addCase(handleLoginAdmin.pending, (state) => {
        state.load = true;
      })
      .addCase(handleLoginAdmin.fulfilled, (state, action) => {
        state.load = false;
        state.is_auth = true;
        state.accessToken = action.payload?.accessToken;
        state.refreshToken = action.payload?.refreshToken;
        state.roles = jwtDecode(action.payload?.accessToken)?.roles;
        state.statusKYC = jwtDecode(action.payload?.accessToken)?.verifiedKYC;
      })
      .addCase(handleLoginAdmin.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      })
      // Verify Login OTP
      .addCase(verifyLoginOtp.pending, (state) => {
        state.load = true;
      })
      .addCase(verifyLoginOtp.fulfilled, (state, action) => {
        state.load = false;
        state.success = true;
        state.is_auth = true;
        state.accessToken = action.payload?.accessToken;
        state.refreshToken = action.payload?.refreshToken;
        state.roles = jwtDecode(action.payload?.accessToken)?.roles;
        state.statusKYC = jwtDecode(action.payload?.accessToken)?.verifiedKYC;
      })
      .addCase(verifyLoginOtp.rejected, (state, action) => {
        state.load = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      // Handle Resend
      .addCase(resendLoginOtp.pending, (state) => {
        state.load = true;
      })
      .addCase(resendLoginOtp.fulfilled, (state) => {
        state.load = false;
        state.success = true;
      })
      .addCase(resendLoginOtp.rejected, (state, action) => {
        state.load = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      // Verifikasi Borrower KYC
      .addCase(verificationBorrowerKYC.pending, (state) => {
        state.load = true;
      })
      .addCase(verificationBorrowerKYC.fulfilled, (state, action) => {
        state.load = false;
        state.success = true;
        state.statusKYC = action?.payload;
      })
      .addCase(verificationBorrowerKYC.rejected, (state, action) => {
        state.load = false;
        state.success = false;
        state.error = true;
        state.statusKYC = "not verified";
        state.message = action.payload;
      })
      // forgot password request
      .addCase(forgotPassRequest.pending, (state) => {
        state.load = true;
      })
      .addCase(forgotPassRequest.fulfilled, (state, action) => {
        state.load = false;
        state.success = true;
      })
      .addCase(forgotPassRequest.rejected, (state, action) => {
        state.load = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })

      //Forgot Password Change
      .addCase(forgotPassChange.pending, (state) => {
        state.load = true;
      })
      .addCase(forgotPassChange.fulfilled, (state) => {
        state.load = false;
        state.success = true;
      })
      .addCase(forgotPassChange.rejected, (state, action) => {
        state.load = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { setStatusKYC, setMessage, setSuccess } = authSlice.actions;
export default authSlice.reducer;
