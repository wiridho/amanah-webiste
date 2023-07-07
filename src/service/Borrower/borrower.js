import axios from "axios";
import apiConfig from "../../api/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

// get current loan history
export const getBorrowersLoan = createAsyncThunk(
  "borrowers/getLoan",
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiConfig.baseUrl}/borrowers/loan`, {
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

// get payment schedule
export const getBorrowersPaymentSchedule = createAsyncThunk(
  "borrowers/paymentSchedule",
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiConfig.baseUrl}/borrowers/payment/schedule`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response?.data?.data);
      return response?.data?.data;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

// Post Request Loan
export const postBorrowersLoan = createAsyncThunk(
  "borrowers/postLoan",
  async ({ accessToken, data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/borrowers/loan`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Swal.fire("Berhasil!", `${response?.data?.message}`, "success");
      navigate();
      return response?.data;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);

// get loan disbursement (get data status pencairan pinjaman)
export const getLoanDisbursement = async ({ accessToken }) => {
  try {
    const response = await axios.get(
      `${apiConfig.baseUrl}/borrowers/loan/disbursement`,
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
