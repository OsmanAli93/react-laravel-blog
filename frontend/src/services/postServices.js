import axios from "axios";

const API_ENDPOINT = "http://127.0.0.1:8000/api";

export const requestFetchPostsService = async (page) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/home?page=${page}`);

    return response;
  } catch (error) {
    return error;
  }
};

export const requestPostService = async (token, data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${API_ENDPOINT}/create/posts`,
      data,
      config
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const requestUpdatePostService = async (token, slug, data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${API_ENDPOINT}/post/${slug}`,
      data,
      config
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const requestDeletePostService = async (token, slug, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${API_ENDPOINT}/post/${slug}`,
      data,
      config
    );

    return response;
  } catch (error) {
    return error;
  }
};
