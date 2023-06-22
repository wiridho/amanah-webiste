import axios from "axios";
import apiConfig from "../../api/apiConfig";

export const getProfileLender = async ({ accessToken }) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/lenders/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const profileImg = await axios.get(
      `https://ui-avatars.com/api/?name=${response?.data?.data?.name}`
    );

    return { ...response?.data.data, profileImg };
  } catch (error) {
    console.log(error);
  }
};
