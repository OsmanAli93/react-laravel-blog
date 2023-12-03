import axios from "axios";

const API_ENDPOINT = "http://127.0.0.1:8000/api";

export const requestUserRegisterService = async (user) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/register`, user);

    return response;
  } catch (error) {
    return error;
  }
};

export const requestUserLoginService = async (user) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/login`, user);

    return response;
  } catch (error) {
    return error;
  }
};

export const requestLogoutUserService = async (token) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(`${API_ENDPOINT}/logout`, null, config);

    return response;
  } catch (error) {
    return error;
  }
};

export const requestUserPofileUpdateService = async (token, id, data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${API_ENDPOINT}/profile/${id}/update`,
      data,
      config
    );

    return response;
  } catch (error) {
    return error;
  }
};
