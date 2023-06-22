import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiConfig from "../../api/apiConfig";

export const handlePortofolio = createAsyncThunk(
  "portofolio",
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      console.log(accessToken);
      const response = await axios.get(`${apiConfig.baseUrl}/lenders/funding`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("response", response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
