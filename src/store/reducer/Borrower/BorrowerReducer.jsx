import { createSlice } from "@reduxjs/toolkit";
import {
  getBorrowersLoan,
  getBorrowersPaymentSchedule,
  postBorrowersLoan,
  postLoanDisbursement,
  postPelunasanTagihan,
} from "../../../service/Borrower/borrower";
import { getProfileBorrower } from "../../../service/Borrower/profile";

const initialState = {
  message: null,
  success: false,
  error: false,
  load: false,

  paymentSchedule: null,
  loanHistory: null,
  profile: null,
  paymentLink: null,
};

const borrowerSlice = createSlice({
  name: "borrower",
  initialState,
  reducers: {
    setMessage(state, data) {
      state.message = data.payload;
    },
    setSuccess(state, data) {
      state.success = data.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get paymanet schedule
      .addCase(getBorrowersPaymentSchedule.pending, (state) => {
        state.load = true;
      })
      .addCase(getBorrowersPaymentSchedule.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
        state.paymentSchedule = action.payload;
      })
      .addCase(getBorrowersPaymentSchedule.rejected, (state, action) => {
        state.load = false;
        state.load = true;
        state.message = action.payload;
      })

      // post request loan
      .addCase(postBorrowersLoan.pending, (state) => {
        state.load = true;
      })
      .addCase(postBorrowersLoan.fulfilled, (state) => {
        state.success = true;
        state.load = false;
        state.error = false;
      })
      .addCase(postBorrowersLoan.rejected, (state, action) => {
        state.success = false;
        state.load = false;
        state.error = true;
        state.message = action.payload;
      })

      // Get borrower loan history
      .addCase(getBorrowersLoan.pending, (state) => {
        state.load = true;
      })
      .addCase(getBorrowersLoan.fulfilled, (state, action) => {
        state.success = true;
        state.load = false;
        state.error = false;
        state.loanHistory = action.payload;
      })
      .addCase(getBorrowersLoan.rejected, (state, action) => {
        state.success = false;
        state.load = false;
        state.error = true;
        state.message = action.payload;
      })

      // post pelunasan tagihan
      .addCase(postPelunasanTagihan.pending, (state) => {
        state.load = true;
      })
      .addCase(postPelunasanTagihan.fulfilled, (state, action) => {
        state.success = true;
        state.load = false;
        state.error = false;
        state.paymentLink = action.payload;
      })
      .addCase(postPelunasanTagihan.rejected, (state, action) => {
        state.success = false;
        state.load = false;
        state.error = true;
        state.message = action.payload;
      })

      // Post Pencairan Pinjaman
      .addCase(postLoanDisbursement.pending, (state) => {
        state.load = true;
      })
      .addCase(postLoanDisbursement.fulfilled, (state, action) => {
        state.success = true;
        state.load = false;
        state.error = false;
      })
      .addCase(postLoanDisbursement.rejected, (state, action) => {
        state.success = false;
        state.load = false;
        state.error = true;
      })

      // Get profile borrower
      .addCase(getProfileBorrower.pending, (state) => {
        state.load = true;
      })
      .addCase(getProfileBorrower.fulfilled, (state, action) => {
        state.success = true;
        state.load = false;
        state.error = false;
        state.profile = action.payload;
      })
      .addCase(getProfileBorrower.rejected, (state, action) => {
        state.success = false;
        state.load = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { setMessage } = borrowerSlice.actions;
export const borrowerActions = borrowerSlice.actions;
export default borrowerSlice.reducer;
