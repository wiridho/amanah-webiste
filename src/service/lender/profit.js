import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiConfig from "../../api/apiConfig";

export const getLenderProfit = createAsyncThunk(
  "profit",
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiConfig.baseUrl}/lenders/profit`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response?.data?.data;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);
