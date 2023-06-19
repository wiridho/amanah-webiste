import axios from "axios";
import apiConfig from "../../api/apiConfig";

export const getProfileLender = async ({ accessToken }) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/lenders/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
