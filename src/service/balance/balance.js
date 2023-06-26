import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiConfig from "../../api/apiConfig";

// Handle Get Balance
export const handleGetBalance = createAsyncThunk(
  "balance/getBalance",
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiConfig.baseUrl}/balance`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response?.data?.data?.balance;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);
// Handle deposit Balance
export const postBalanceDeposit = createAsyncThunk(
  "balance/postBalanceDeposit",
  async ({ accessToken, data, setPaymentStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/balance/deposit`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPaymentStatus("waitingPayment");
      return `https://${response?.data?.data?.paymentLink}`;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);
