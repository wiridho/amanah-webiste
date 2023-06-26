import { createSlice } from "@reduxjs/toolkit";
import { handlePortofolio } from "../../../service/lender/portofolio";

const initialState = {
  success: null,
  load: false,
  error: false,
  data: null,
  message: null,
};

const lenderSlice = createSlice({
  name: "lender",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Handle Portofolio
    builder
      .addCase(handlePortofolio.pending, (state) => {
        state.load = true;
      })
      .addCase(handlePortofolio.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(handlePortofolio.rejected, (state, action) => {
        state.load = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});
