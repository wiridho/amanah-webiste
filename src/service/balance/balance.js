import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiConfig from "../../api/apiConfig";
import Swal from "sweetalert2";

//  Get Balance
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
// post deposit Balance
export const postBalanceDeposit = createAsyncThunk(
  "balance/postBalanceDeposit",
  async (
    { accessToken, data, setPaymentStatus, navigate },
    { rejectWithValue }
  ) => {
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
      navigate();
      return `https://${response?.data?.data?.paymentLink}`;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

// Post Withdraw
export const postBalanceWithdraw = createAsyncThunk(
  "balance/postBalanceWithdraw",
  async ({ accessToken, data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/balance/withdraw`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      navigate("/funder/riwayat-transaksi");
      return response?.data?.data;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

// get balance account
export const getBalanceAccountBank = async ({ accessToken }) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/balance/account`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    let listBank = response?.data?.data.map((item) => {
      return { ...item, ...{ isChecked: false } };
    });
    return listBank;
  } catch (error) {
    console.log(error);
  }
};

// post balance account
export const postBalanceAccountBank = createAsyncThunk(
  "balance/postBalanceAccountBank",
  async ({ accessToken, data, navigate, to }, { rejectWithValue }) => {
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
      navigate(to);
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

// Get balance banks (get all available banks)
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

// Get transaction history (get all transaction history)
export const getBalanceTransactionWithdraw = createAsyncThunk(
  "balance/getBalanceTransactionWithdraw",
  async ({ accessToken, status }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiConfig.baseUrl}/balance/transaction/history`,
        {
          params: {
            type: "Withdraw",
            status: status,
          },
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
export const getBalanceTransactionDeposit = createAsyncThunk(
  "balance/getBalanceTransactionDeposit",
  async ({ accessToken, status }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiConfig.baseUrl}/balance/transaction/history`,
        {
          params: {
            type: "Deposit",
            status: status,
          },
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

// History
export const getBalanceTransactionHistory = createAsyncThunk(
  "balance/getBalanceTransactionHistory",
  async ({ accessToken, params }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiConfig.baseUrl}/balance/transaction/history`,
        {
          params: params,
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

// get transaction account
export const getBalanceTransactionHistoryAddList = async ({
  accessToken,
  param,
}) => {
  try {
    const response = await axios.get(
      `${apiConfig.baseUrl}/balance/transaction/history`,

      {
        params: param,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
