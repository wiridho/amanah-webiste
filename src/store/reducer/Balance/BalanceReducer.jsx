import { createSlice } from "@reduxjs/toolkit";
import {
  getBalanceAccountBank,
  handleGetBalance,
  postBalanceAccountBank,
  postBalanceDeposit,
} from "../../../service/balance/balance";

const initialState = {
  success: null,
  load: false,
  error: false,
  balance: null,
  message: null,
  paymentLink: null,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //handle get balance
      .addCase(handleGetBalance.pending, (state) => {
        state.load = true;
      })
      .addCase(handleGetBalance.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
        state.balance = action.payload;
      })
      .addCase(handleGetBalance.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      })
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
      // Get balance account bank
      // .addCase(getBalanceAccountBank.pending, (state) => {
      //   state.load = true;
      // })
      // .addCase(getBalanceAccountBank.fulfilled, (state, action) => {
      //   state.load = false;
      //   state.error = false;
      // })
      // .addCase(getBalanceAccountBank.rejected, (state, action) => {
      //   state.load = false;
      //   state.error = true;
      //   state.message = action.payload;
      // })
      // Post add account bank
      .addCase(postBalanceAccountBank.pending, (state) => {
        state.load = true;
      })
      .addCase(postBalanceAccountBank.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
        state.paymentLink = action.payload;
      })
      .addCase(postBalanceAccountBank.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export default balanceSlice.reducer;
