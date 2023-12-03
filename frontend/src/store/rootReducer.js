import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import { postReducer } from "./reducers/postReducer";

import { LOGOUT_SUCCESS } from "../constants";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    storage.removeItem("persist:user");

    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
