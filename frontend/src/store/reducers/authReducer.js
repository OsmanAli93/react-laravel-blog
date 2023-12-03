import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  RESET_SUCCESS_MESSAGE,
  LOADING,
} from "../../constants/index";

const initialState = {
  token: null,
  user: null,
  loading: false,
  errorMessage: "",
  successMessage: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: action.payload,
        successMessage: action.success,
        loading: false,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        successMessage: "",
        errorMessage: action.error,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: action.payload,
        successMessage: action.success,
        loading: false,
      };
    case LOGIN_FAILED:
      return {
        successMessage: "",
        errorMessage: action.error,
        loading: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        errorMessage: "",
        successMessage: action.success,
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        errorMessage: action.error,
        successMessage: "",
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        successMessage: action.success,
        loading: false,
      };
    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        errorMessage: action.error,
        successMessage: "",
      };
    case RESET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: "",
      };
    case LOADING:
      return {
        ...state,
        loading: action.status,
      };
    default:
      return state;
  }
};
