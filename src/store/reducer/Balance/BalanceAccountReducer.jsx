import { createSlice } from "@reduxjs/toolkit";
import { postBalanceAccountBank } from "../../../service/balance/balance";

const initialState = {
  success: null,
  load: false,
  error: false,
  message: null,
};

const balanceAccountSlice = createSlice({
  name: "balanceAccountSlice",
  initialState,
  reducers: {
    setMessage(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //Post Account Bank
      .addCase(postBalanceAccountBank.pending, (state) => {
        state.load = true;
      })
      .addCase(postBalanceAccountBank.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
      })
      .addCase(postBalanceAccountBank.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});
export const { setMessage } = balanceAccountSlice.actions;
export default balanceAccountSlice.reducer;
