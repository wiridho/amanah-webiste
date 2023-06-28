import { createSlice } from "@reduxjs/toolkit";
import { postLenderFunding } from "../../../service/lender/funding";
const initialState = {
  success: null,
  load: false,
  error: false,
  data: null,
  message: null,
};

const lenderFundingSlice = createSlice({
  name: "lender_funding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLenderFunding.pending, (state) => {
        state.load = true;
      })
      .addCase(postLenderFunding.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(postLenderFunding.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export default lenderFundingSlice.reducer;
