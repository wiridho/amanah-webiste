import { createSlice } from "@reduxjs/toolkit";
import {
  handleGetBalance,
  postBalanceAccountBank,
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
  reducers: {
    setMessage(state, data) {
      state.message = data.payload;
    },
  },
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
      });

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
    // .addCase(postBalanceAccountBank.pending, (state) => {
    //   state.load = true;
    // })
    // .addCase(postBalanceAccountBank.fulfilled, (state, action) => {
    //   state.load = false;
    //   state.error = false;
    // })
    // .addCase(postBalanceAccountBank.rejected, (state, action) => {
    //   state.load = false;
    //   state.error = true;
    //   state.message = action.payload;
    // });
  },
});

export const { setMessage } = balanceSlice.actions;
export default balanceSlice.reducer;
