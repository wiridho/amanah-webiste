import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiConfig from "../../api/apiConfig";

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
      params.setVisible(true);
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
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/authentication/login?action=email-otp`,
        params.data
      );
      console.log("response login", response);
      params.navigate("/verifylogin");
      return response?.data?.data;
    } catch (error) {
      params.setVisible(true);
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

// Handle Verify Login OTP
export const verifyLoginOtp = createAsyncThunk(
  "auth/verifyLoginOtp",
  async (params, { rejectWithValue }) => {
    console.log("params ", params);
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/authentication/login?action=login`,
        params.body
      );
      console.log("response verify login otp", response.data.data);
      params.navigate("/");
      return response?.data.data;
    } catch (err) {
      params.setVisible(true);
      const message_error = err.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

// Handle Resend Login OTP
export const resendLoginOtp = createAsyncThunk(
  "auth/resend/login",
  async (params) => {
    try {
      console.log("params", params);
      const response = await axios.post(
        `${apiConfig.baseUrl}/authentication/login/otp/resend`,
        params
      );
      console.log("response resend otp", response);
    } catch (err) {
      console.log(err);
    }
  }
);
