import axios from "axios";
import apiConfig from "../../api/apiConfig";

export const lenderFunding = async ({ data, accessToken }) => {
  console.log("masuk function");
  // try {
  //   const response = await axios.post(
  //     `${apiConfig.baseUrl}/lenders/funding`,
  //     data,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   );
  //   console.log("response?.data");
  // } catch (error) {
  //   console.log(error);
  // }
};
