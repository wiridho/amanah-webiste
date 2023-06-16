import { createSlice } from "@reduxjs/toolkit";
import {
  handleLogin,
  handleRegister,
  resendRegisterVerify,
  verifyLoginOtp,
} from "../../service/authentication/authService";
import jwtDecode from "jwt-decode";

const initialState = {
  success: null,
  load: false,
  error: false,
  data: null,
  accessToken: null,
  refreshToken: null,
  message_error: null,
  statusKYC: null,

  // buat private route
  is_auth: false,
  roles: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatusKYC(state, data) {
      state.statusKYC = data.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Register
      .addCase(handleRegister.pending, (state) => {
        state.load = true;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        console.log(action.payload);
        state.load = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message_error = action.payload;
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
        state.data = action.payload;
        state.success = true;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.success = false;
        state.load = false;
        state.error = true;
        state.message_error = action.payload;
      })

      .addCase(verifyLoginOtp.pending, (state) => {
        state.load = true;
      })
      .addCase(verifyLoginOtp.fulfilled, (state, action) => {
        state.load = false;
        state.is_auth = true;
        state.accessToken = action.payload?.accessToken;
        state.refreshToken = action.payload?.refreshToken;
        state.roles = jwtDecode(action.payload?.accessToken)?.roles;
        state.statusKYC = jwtDecode(action.payload?.accessToken)?.verifiedKYC;
      })
      .addCase(verifyLoginOtp.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message_error = action.payload;
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
