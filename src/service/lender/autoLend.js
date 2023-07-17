import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../api/apiConfig";
import axios from "axios";
import Swal from "sweetalert2";

export const postFundingAuto = createAsyncThunk(
  "lender/postFundingAuto",
  async ({ data, accessToken, onClose, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/lenders/funding/auto`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      await Swal.fire("Berhasil!", `${response?.data?.message}`, "success");
      dispatch(getFundingAuto({ accessToken }));
      onClose();
      return response?.data?.data;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

export const getFundingAuto = createAsyncThunk(
  "lender/getFundingAuto",
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiConfig.baseUrl}/lenders/funding/auto`,
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
export const deleteFundingAuto = createAsyncThunk(
  "lender/deleteFundingAuto",
  async ({ data, accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${apiConfig.baseUrl}/lenders/funding/auto/${data}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return null;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);
