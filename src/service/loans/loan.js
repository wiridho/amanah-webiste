import axios from "axios";
import apiConfig from "../../api/apiConfig";

export const getAvailableLoan = async ({ params, accessToken }) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/loans/available`, {
      params: params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get Loan Detail

export const getDetailLoan = async ({ accessToken, loanId }) => {
  try {
    const response = await axios.get(
      `${apiConfig.baseUrl}/loans/available/${loanId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data;
  } catch (err) {
    return { data: null };
  }
};
