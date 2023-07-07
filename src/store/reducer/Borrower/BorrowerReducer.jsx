import { createSlice } from "@reduxjs/toolkit";
import {
  getBorrowersPaymentSchedule,
  postBorrowersLoan,
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
};

const borrowerSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setMessage(state, data) {
      state.message = data.payload;
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
export default borrowerSlice.reducer;
