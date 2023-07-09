import axios from "axios";
import apiConfig from "../../api/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { create } from "lodash";

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

export const postLoanDisbursement = async ({ accessToken, navigate, data }) => {
  try {
    const response = await axios.post(
      `${apiConfig.baseUrl}/borrowers/loan/disbursement`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    Swal.fire(
      "Pencairan dana berhasil!",
      `${response?.data?.message}`,
      "success"
    );
    navigate("/borrower/riwayat-pinjaman");
    return response?.data?.data;
  } catch (error) {
    Swal.fire(
      "Pencairan dana gagal!",
      `${error?.response?.data?.message}`,
      "error"
    );
    return null;
  }
};

// Pelunasan Tagihan
export const postPelunasanTagihan = createAsyncThunk(
  "borrowers/postPelunasanTagihan",
  async ({ accessToken, data, setPaymentModal }, { rejectWithValue }) => {
    // setPaymentModal(true);

    try {
      const response = await axios.post(
        `${apiConfig.baseUrl}/borrowers/loan/repayment`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPaymentModal(true);
      return `https://${response?.data?.data?.paymentLink}`;
    } catch (error) {
      const message_error = error.response?.data?.message;
      return rejectWithValue(message_error);
    }
  }
);
