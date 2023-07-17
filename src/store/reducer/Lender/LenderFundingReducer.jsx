import { createSlice } from "@reduxjs/toolkit";
import { postLenderFunding } from "../../../service/lender/funding";
import { getLenderFunding } from "../../../service/lender/portofolio";
import { getLenderProfit } from "../../../service/lender/profit";
import {
  deleteFundingAuto,
  getFundingAuto,
  postFundingAuto,
} from "../../../service/lender/autoLend";

const initialState = {
  success: null,
  load: false,
  error: false,
  data: null,
  message: null,
  portofolio: null,
  profit: null,
  autoLend: null,
};

const lenderFundingSlice = createSlice({
  name: "lender_funding",
  initialState,
  reducers: {
    setMessage(state, data) {
      state.message = data.payload;
    },
  },
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
      })

      // get lender profit
      .addCase(getLenderProfit.pending, (state) => {
        state.load = true;
      })
      .addCase(getLenderProfit.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
        state.profit = action.payload;
      })
      .addCase(getLenderProfit.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      })

      // Post AutoLend
      .addCase(postFundingAuto.pending, (state) => {
        state.load = true;
      })
      .addCase(postFundingAuto.fulfilled, (state) => {
        state.load = false;
        state.error = false;
      })
      .addCase(postFundingAuto.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      })

      // Get AutoLend Status
      .addCase(getFundingAuto.pending, (state) => {
        state.load = true;
      })
      .addCase(getFundingAuto.fulfilled, (state, action) => {
        state.load = false;
        state.autoLend = action.payload;
        state.error = false;
      })
      .addCase(getFundingAuto.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      })

      // Delete AutoLend
      .addCase(deleteFundingAuto.pending, (state) => {
        state.load = true;
      })
      .addCase(deleteFundingAuto.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
      })
      .addCase(deleteFundingAuto.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { setMessage } = lenderFundingSlice.actions;
export const lenderActions = lenderFundingSlice.actions;
export default lenderFundingSlice.reducer;
