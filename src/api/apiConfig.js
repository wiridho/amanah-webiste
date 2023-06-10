const apiConfig = {
  baseUrl: process.env.REACT_APP_API_BASE_URL,

  // Firebase deeplink
  REACT_APP_FIREBASE_DEEP_LINK_URL:
    "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyCNt1GL6dCUifGX-hxXPUrLjTJ3ryN1FmQ",
  REACT_APP_FIREBASE_DEEP_LINK_DOMAIN_URI_PREFIX:
    "https://amanahlending.page.link",
  REACT_APP_DEEP_LINK_URL: "https://amanahlending.page.link/flutter",
  REACT_APP_ANDROID_PACKAGE_NAME: "com.example.amanah",
};

export default apiConfig;
