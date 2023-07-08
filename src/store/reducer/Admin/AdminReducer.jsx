// import { createSlice } from '@reduxjs/toolkit';
// import { handleLoginAdmin } from '../../../service/authentication/authService';

// const initialState = {
//     success: null,
//     load: false,
//     error: false,
//     data: null,
//     message: null,
// };

// const adminSlice = createSlice({
//     name: 'admin',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         //Handle Portofolio
//         builder
//             .addCase(handleLoginAdmin.pending, (state) => {
//                 state.load = true;
//             })
//             .addCase(handleLoginAdmin.fulfilled, (state, action) => {
//                 state.load = false;
//                 state.error = false;
//                 state.data = action.payload;
//             })
//             .addCase(handleLoginAdmin.rejected, (state, action) => {
//                 state.load = false;
//                 state.error = true;
//                 state.message = action.payload;
//             });
//     },
// });

// export default adminSlice.reducer;
