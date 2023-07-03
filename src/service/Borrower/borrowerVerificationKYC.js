import axios from "axios";
import apiConfig from "../../api/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const verificationBorrowerKYC = async ({ accessToken, formData }) => {
//   try {
//     const response = await axios.put(
//       `${apiConfig.baseUrl}/borrowers/request/verification`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     if (response?.data?.success) {
//       let borrowerStatusKyc = getBorrowerStatusKYC({ accessToken });
//       return borrowerStatusKyc;
//     }
//   } catch (error) {
//     // setVisible(true);
//     return error?.response?.data;
//   }
// };

export const verificationBorrowerKYC = createAsyncThunk(
  "borrower/verificationKYC",
  async ({ accessToken, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${apiConfig.baseUrl}/borrowers/request/verification`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response?.data?.success) {
        let borrowerStatusKyc = getBorrowerStatusKYC({ accessToken });
        return borrowerStatusKyc;
      }
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

export const getBorrowerStatusKYC = async ({ accessToken }) => {
  try {
    const response = await axios.get(
      `${apiConfig.baseUrl}/authentication/account/status`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.data?.kyc;
  } catch (error) {
    console.log(error);
  }
};
