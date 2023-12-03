import {
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LOADING,
  RESET_SUCCESS_MESSAGE,
} from "../../constants";

export const createPostAction = (token, data, navigate) => {
  return {
    type: CREATE_POST,
    token,
    data,
    navigate,
  };
};

export const updatePostAction = (token, slug, data) => {
  return {
    type: UPDATE_POST,
    token,
    slug,
    data,
  };
};

export const deletePostAction = (token, slug, data) => {
  return {
    type: DELETE_POST,
    token,
    slug,
    data,
  };
};

export const resetSuccessMessage = () => {
  return {
    type: RESET_SUCCESS_MESSAGE,
  };
};

export const loadingAction = (status) => {
  return {
    type: LOADING,
    status,
  };
};
