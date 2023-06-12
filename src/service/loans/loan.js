import axios from "axios";
import apiConfig from "../../api/apiConfig";

export const getAvailableLoan = async ({ accessToken }) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/loans/available`, {
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
