// After Login
export const doPost = async ({ endpoint, token, params, data }) => {
  const method = "POST";
  const headers = {
    Authorization: "Bearer " + token,
  };
  const url = apiConfig.baseUrl + endpoint;

  const request = {
    url,
    method,
    headers,
    params,
    data,
  };

  const response = await axios(request);
  return response;
};

// Method Get with bearer token

export const doGet = async ({ endpoint, token, params, data }) => {
  const method = "POST";
  const headers = {
    Authorization: "Bearer " + token,
  };
  const url = apiConfig.baseUrl + endpoint;

  const request = {
    url,
    method,
    headers,
    params,
    data,
  };

  const response = await axios(request);
  return response;
};
