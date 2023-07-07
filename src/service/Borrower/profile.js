import axios from "axios";
import apiConfig from "../../api/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfileBorrower = createAsyncThunk(
  "borrower/getProfileBorrower",
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiConfig.baseUrl}/borrowers/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response?.data?.data;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);
