import { createSlice } from "@reduxjs/toolkit";
import {
  postBalanceDeposit,
  postBalanceWithdraw,
  getBalanceTransactionWithdraw,
  getBalanceTransactionDeposit,
  getBalanceTransactionHistory,
} from "../../../service/balance/balance";

const initialState = {
  success: null,
  load: false,
  error: false,
  message: null,
  paymentLink: null,
  bankSelected: null,
  data: null,
  transactionWithdraw: null,
  transactionDeposit: null,
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
      // Post  Deposit
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

      // Post Withdraw
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
      })
      // Get all transaction History
      .addCase(getBalanceTransactionWithdraw.pending, (state) => {
        state.load = true;
      })
      .addCase(getBalanceTransactionWithdraw.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
        state.transactionWithdraw = action.payload;
      })
      .addCase(getBalanceTransactionWithdraw.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      })
      // Get Transaction Deposit
      .addCase(getBalanceTransactionDeposit.pending, (state) => {
        state.load = true;
      })
      .addCase(getBalanceTransactionDeposit.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
        state.transactionDeposit = action.payload;
      })
      .addCase(getBalanceTransactionDeposit.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      })
      // Get all history
      .addCase(getBalanceTransactionHistory.pending, (state) => {
        state.load = true;
      })
      .addCase(getBalanceTransactionHistory.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getBalanceTransactionHistory.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});
export const { setBankSelected } = balanceTransactionSlice.actions;
export default balanceTransactionSlice.reducer;
