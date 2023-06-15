import axios from "axios";
import apiConfig from "../../api/apiConfig";

export const verificationLenderKYC = async ({ accessToken, formData }) => {
  try {
    const response = await axios.put(
      `${apiConfig.baseUrl}/lenders/request/verification`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const getLenderStatusKYC = async ({ accessToken }) => {
  try {
    const response = await axios.get(
      `${apiConfig.baseUrl}/authentication/account/status`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
