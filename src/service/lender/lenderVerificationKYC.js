import axios from "axios";
import apiConfig from "../../api/apiConfig";

export const verificationLenderKYC = async ({
  accessToken,
  formData,
  setVisible,
}) => {
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
    return response?.data;
  } catch (error) {
    setVisible(true);
    return error?.response?.data;
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
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
