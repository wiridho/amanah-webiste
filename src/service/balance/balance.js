import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiConfig from "../../api/apiConfig";

// Handle Get Balance
export const handleGetBalance = createAsyncThunk(
  "balance/getBalance",
  async ({ accessToken, data }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiConfig.baseUrl}/balance`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("get balance", response);
      return response?.data?.data;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);
