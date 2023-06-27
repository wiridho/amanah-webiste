import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiConfig from "../../api/apiConfig";
import Swal from "sweetalert2";

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

// Get all banks
export const getBalanceBanks = async ({ accessToken }) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/balance/banks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getBalanceAccountBank = async ({ accessToken }) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/balance/account`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// Get balance account bank
// export const getBalanceAccountBank = createAsyncThunk(
//   "balance/getBalanceAccountBank",
//   async ({ accessToken }, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${apiConfig.baseUrl}/balance/account`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       console.log(response?.data?.data);
//       return response?.data?.data;
//     } catch (error) {
//       const message_error = error.response?.data?.message;
//       return rejectWithValue(message_error);
//     }
//   }
// );

// Add new bank
export const postBalanceAccountBank = createAsyncThunk(
  "balance/postBalanceAccountBank",
  async ({ accessToken, data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/balance/account`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      await Swal.fire(
        "Berhasil!",
        "Rekening telah berhasil ditambahkan ",
        "success"
      );

      navigate("/funder/withdraw/listBank");
      console.log(response?.data?.data);
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);
