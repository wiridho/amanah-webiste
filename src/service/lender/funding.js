import axios from "axios";
import apiConfig from "../../api/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const lenderFunding = async ({ data, accessToken }) => {
//   try {
//     const response = await axios.post(
//       `${apiConfig.baseUrl}/lenders/funding`,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     console.log(response?.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

//  Post Funding Lender
export const postLenderFunding = createAsyncThunk(
  "lender/postLenderFunding",
  async ({ data, accessToken }, { rejectWithValue }) => {
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
      return response?.data?.data;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);
