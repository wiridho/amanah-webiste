import axios from "axios";
import apiConfig from "../../api/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

//  Post Funding Lender
export const postLenderFunding = createAsyncThunk(
  "lender/postLenderFunding",
  async ({ data, accessToken, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/lenders/funding`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Swal.fire("Berhasil!", `${response?.data?.message}`, "success");
      navigate();
      return response?.data?.data;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);
