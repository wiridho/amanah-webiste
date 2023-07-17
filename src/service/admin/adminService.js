import axios from "axios";
import apiConfig from "../../api/apiConfig";

export const getAllUsers = async ({ accessToken }) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/admin/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    return null;
  }
};
export const getAllLoan = async ({ accessToken }) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/admin/loans`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    return null;
  }
};
export const getAllFunding = async ({ accessToken }) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/admin/fundings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    return null;
  }
};

export const getAllAutoLend = async ({ accessToken }) => {
  try {
    const response = await axios.get(
      `${apiConfig.baseUrl}/admin/loans/funding/auto`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    return null;
  }
};

export const getAllKycRequest = async ({ accessToken }) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/admin/users/kyc`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    return null;
  }
};
export const postKycRequest = async ({ data, accessToken }) => {
  try {
    const response = await axios.post(
      `${apiConfig.baseUrl}/admin/users/kyc`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    window.location.reload();
    return response?.data?.data;
  } catch (error) {
    return null;
  }
};

export const getTotalCounts = async ({ accessToken }) => {
  try {
    const response = await axios.get(`${apiConfig.baseUrl}/admin/counts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    return null;
  }
};

export const getMostLoansFundings = async ({ accessToken }) => {
  try {
    const response = await axios.get(
      `${apiConfig.baseUrl}/admin/counts/transaction`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    return null;
  }
};

export const getMostCategoryBorrowed = async ({ accessToken }) => {
  try {
    const response = await axios.get(
      `${apiConfig.baseUrl}/admin/loans/category/counts`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    return null;
  }
};
