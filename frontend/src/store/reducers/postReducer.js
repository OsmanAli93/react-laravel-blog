import {
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILED,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILED,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILED,
  RESET_SUCCESS_MESSAGE,
} from "../../constants/index";

const initialState = {
  loading: false,
  errorMessage: "",
  successMessage: "",
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        successMessage: action.success,
        errorMessage: "",
        loading: false,
      };
    case CREATE_POST_FAILED:
      return {
        ...state,
        successMessage: "",
        errorMessage: action.error,
        loading: false,
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        successMessage: action.success,
        errorMessage: "",
        loading: false,
      };
    case UPDATE_POST_FAILED:
      return {
        ...state,
        successMessage: "",
        errorMessage: action.error,
        loading: false,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        successMessage: action.success,
        errorMessage: action.error,
        loading: false,
      };
    case DELETE_POST_FAILED:
      return {
        ...state,
        successMessage: "",
        errorMessage: action.error,
        loading: false,
      };
    case RESET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: "",
      };
    default:
      return state;
  }
};
