import { createSlice } from "@reduxjs/toolkit";
import { postLenderFunding } from "../../../service/lender/funding";
import { getLenderFunding } from "../../../service/lender/portofolio";

const initialState = {
  success: null,
  load: false,
  error: false,
  data: null,
  message: null,
  portofolio: null,
};

const lenderFundingSlice = createSlice({
  name: "lender_funding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Post Lender Funding
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
      })
      // Get Lender Funding (get portofolio list)
      .addCase(getLenderFunding.pending, (state) => {
        state.load = true;
      })
      .addCase(getLenderFunding.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
        state.portofolio = action.payload;
      })
      .addCase(getLenderFunding.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export default lenderFundingSlice.reducer;
