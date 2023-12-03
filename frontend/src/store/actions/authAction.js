import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  LOADING,
  RESET_SUCCESS_MESSAGE,
  UPDATE_PROFILE,
} from "../../constants/index";

export const registerUserAction = (user, navigate) => {
  return {
    type: REGISTER_USER,
    user,
    navigate,
  };
};

export const loginUserAction = (user, navigate) => {
  return {
    type: LOGIN_USER,
    user,
    navigate,
  };
};

export const logoutUserAction = (token, navigate) => {
  return {
    type: LOGOUT_USER,
    token,
    navigate,
  };
};

export const updateUserProfile = (token, id, data) => {
  return {
    type: UPDATE_PROFILE,
    token,
    id,
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
