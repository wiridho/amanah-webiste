import { createSlice } from "@reduxjs/toolkit";
import { getBorrowersPaymentSchedule } from "../../../service/Borrower/borrower";

const initialState = {
  message: null,
  success: null,
  error: false,
  load: false,

  paymentSchedule: null,
  loanHistory: null,
};

const borrowerSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
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
      });
  },
});

export default borrowerSlice.reducer;
