import axios from "axios";
import apiConfig from "../../api/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

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

export const getTotalCounts = async ({ accessToken }) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/admin/counts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    return null;
  }
};

export const getMostLoansFundings = async ({ accessToken }) => {
  try {
    const response = await axios.get(
      `${apiConfig.baseUrl}/admin/counts/transaction`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    return null;
  }
};

export const getMostCategoryBorrowed = async ({ accessToken }) => {
  try {
    const response = await axios.get(
      `${apiConfig.baseUrl}/admin/loans/category/counts`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    return null;
  }
};
