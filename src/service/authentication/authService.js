import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiConfig from "../../api/apiConfig";
import Swal from "sweetalert2";

// Handle Register
export const handleRegister = createAsyncThunk(
  "auth/register",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/authentication/register`,
        params.data
      );
      params.navigate("/register/success");
      return response.data.data;
    } catch (error) {
      console.log("error", error);
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

//Handle verify accout via Email Account
export const verifyEmailAccount = createAsyncThunk(
  "auth/verify/email",
  async (params) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/authentication/verification/email/${params.userId}/${params.token}`
      );
      console.log("response verify", response);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
);

// Handle Resend Link Verify Register
export const resendRegisterVerify = createAsyncThunk(
  "auth/resend",
  async (userId) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/authentication/verification/email/${userId}/resend`,
        { userId }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "auth/login",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/authentication/login?action=email-otp`,
        data
      );
      navigate("/verifylogin");
      return response?.data?.data;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

export const handleLoginAdmin = createAsyncThunk(
  "auth/login/admin",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/authentication/login?action=admin`,
        params.data
      );
      console.log("response login", response);
      params.navigate("/admin");
      return response?.data?.data;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

// Handle Verify Login OTP
export const verifyLoginOtp = createAsyncThunk(
  "auth/verifyLoginOtp",
  async ({ body, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/authentication/login?action=login`,
        body
      );
      console.log("response verify login otp", response.data.data);
      navigate("/");
      return response?.data.data;
    } catch (err) {
      const message_error = err.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

// Handle Resend Login OTP
export const resendLoginOtp = createAsyncThunk(
  "auth/resendOTp",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/authentication/login/otp/resend`,
        params
      );

      Swal.fire("Berhasil", `Kode OTP dikirim ke email`, "success");
    } catch (err) {
      const message_error = err.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

// Forgot Password Request
export const forgotPassRequest = createAsyncThunk(
  "auth/forgotPass",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/authentication/password/reset/request`,
        data
      );
      Swal.fire("Berhasil", response?.data?.message, "success");
    } catch (err) {
      const message_error = err.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

// Forgot Password Change
export const forgotPassChange = createAsyncThunk(
  "auth/forgotPassChange",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/authentication/password/reset/change?action=forget-password`,
        data
      );
      Swal.fire("Berhasil", response?.data?.message, "success");
      navigate();
    } catch (err) {
      const message_error = err.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);
