import { createSlice } from "@reduxjs/toolkit";
import {
  postBalanceDeposit,
  postBalanceWithdraw,
} from "../../../service/balance/balance";

const initialState = {
  success: null,
  load: false,
  error: false,
  message: null,
  paymentLink: null,
  bankSelected: null,
};

const balanceTransactionSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBankSelected(state, data) {
      state.bankSelected = data.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Post Balance Deposit
      .addCase(postBalanceDeposit.pending, (state) => {
        state.load = true;
      })
      .addCase(postBalanceDeposit.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
        state.paymentLink = action.payload;
      })
      .addCase(postBalanceDeposit.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      })

      //Post Withdraw
      .addCase(postBalanceWithdraw.pending, (state) => {
        state.load = true;
      })
      .addCase(postBalanceWithdraw.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
        state.message = action.payload;
      })
      .addCase(postBalanceWithdraw.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});
export const { setBankSelected } = balanceTransactionSlice.actions;
export default balanceTransactionSlice.reducer;
