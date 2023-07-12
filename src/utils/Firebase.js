import axios from "axios";
import apiConfig from "../api/apiConfig";

export const generateDynamicLink = async (token, userId) => {
  console.log(userId);
  console.log(token);
  try {
    const { data } = await axios.post(
      apiConfig?.REACT_APP_FIREBASE_DEEP_LINK_URL,
      {
        dynamicLinkInfo: {
          domainUriPrefix:
            apiConfig?.REACT_APP_FIREBASE_DEEP_LINK_DOMAIN_URI_PREFIX,
          link: `${
            apiConfig?.REACT_APP_DEEP_LINK_URL
          }?token=${token}&uid=${userId.toString()}`,
          androidInfo: {
            androidPackageName: apiConfig?.REACT_APP_ANDROID_PACKAGE_NAME,
          },
        },
      }
    );
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("ERROR GENERATE DYNAMIC LINK", error);
  }
};
