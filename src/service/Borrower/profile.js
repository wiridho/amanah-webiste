import axios from "axios";
import apiConfig from "../../api/apiConfig";

// export const getProfileBorrower = async ({ accessToken }) => {
//   try {
//     const response = await axios.get(`${apiConfig.baseUrl}/lenders/profile`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const profileImg = await axios.get(
//       `https://ui-avatars.com/api/?name=${response?.data?.data?.name}`
//     );

//     return { ...response?.data.data, profileImg };
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getProfileBorrower = createAsyncThunk(
//   "borrower/verificationKYC",
//   async ({ accessToken, formData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${apiConfig.baseUrl}/borrowers/request/verification`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       if (response?.data?.success) {
//         let borrowerStatusKyc = getBorrowerStatusKYC({ accessToken });
//         return borrowerStatusKyc;
//       }
//     } catch (error) {
//       const message_error = error.response?.data?.message;
//       return rejectWithValue(message_error);
//     }
//   }
// );
