import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_USER,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  LOGOUT_FAILED,
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILED,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILED,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILED,
} from "../constants/index";

import { takeLatest, takeEvery, put, call } from "redux-saga/effects";
import * as authenticate from "../services/authenticate";
import * as postApi from "../services/postServices";

function* registerUser(action) {
  const results = yield call(
    authenticate.requestUserRegisterService,
    action.user
  );

  if (results.status >= 200 && results.status < 400) {
    yield put({
      type: REGISTER_SUCCESS,
      token: results.data.token,
      payload: results.data.user,
      success: results.data.message,
    });

    action.navigate("/");
  } else if (results.response.status >= 400 && results.response.status < 600) {
    console.log(results);
    yield put({
      type: REGISTER_FAILED,
      error: results.response.data.message,
    });
  }
}

function* loginUser(action) {
  const results = yield call(authenticate.requestUserLoginService, action.user);

  console.log(results.data);

  if (results.status >= 200 && results.status < 400) {
    yield put({
      type: LOGIN_SUCCESS,
      token: results.data.token,
      payload: results.data.user,
      success: results.data.message,
    });

    action.navigate("/");
  } else if (results.response.status >= 400 && results.response.status < 600) {
    yield put({
      type: LOGIN_FAILED,
      error: results.response.data.message,
    });
  }
}

function* logoutUser(action) {
  const results = yield call(
    authenticate.requestLogoutUserService,
    action.token
  );

  if (results.status >= 200 && results.status < 400) {
    yield put({
      type: LOGOUT_SUCCESS,
      success: results.data.message,
    });

    action.navigate("/");
  } else if (results.response.status >= 400 && results.response.status < 600) {
    yield put({
      type: LOGOUT_FAILED,
      error: results.response.data.message,
    });
  }
}

function* updateProfile(action) {
  const results = yield call(
    authenticate.requestUserPofileUpdateService,
    action.token,
    action.id,
    action.data
  );

  if (results.status >= 200 && results.status < 400) {
    console.log("saga", results.data);
    yield put({
      type: UPDATE_PROFILE_SUCCESS,
      payload: results.data.user,
      success: results.data.message,
    });
  } else if (results.response.status >= 400 && results.response.status < 600) {
    yield put({
      type: UPDATE_PROFILE_FAILED,
      error: results.response.data.message,
    });
  }
}

// POST
function* fetchPosts(action) {
  const results = yield call(postApi.requestFetchPostsService, action.page);

  console.log(results);

  if (results.status >= 200 && results.status < 400) {
    yield put({
      type: FETCH_POSTS_SUCCESS,
      payload: results.data.posts,
    });
  } else if (results.response.status >= 400 && results.response.status < 600) {
    yield put({
      type: FETCH_POSTS_FAILED,
      error: results.response.data.message,
    });
  }
}

function* createPost(action) {
  const results = yield call(
    postApi.requestPostService,
    action.token,
    action.data
  );

  if (results.status >= 200 && results.status < 400) {
    yield put({
      type: CREATE_POST_SUCCESS,
      success: results.data.message,
    });

    action.navigate("/");
  } else if (results.response.status >= 400 && results.response.status < 600) {
    console.log("saga", results);
    yield put({
      type: CREATE_POST_FAILED,
      error: results.response.data.message,
    });
  }
}

function* updatePost(action) {
  const results = yield call(
    postApi.requestUpdatePostService,
    action.token,
    action.slug,
    action.data
  );

  if (results.status >= 200 && results.status < 400) {
    yield put({
      type: UPDATE_POST_SUCCESS,
      success: results.data.message,
    });
    console.log(results);
  } else if (results.response.status >= 400 && results.response.status < 600) {
    console.log("saga", results);
    yield put({
      type: UPDATE_POST_FAILED,
      error: results.response.data.message,
    });
  }
}

function* deletePost(action) {
  const results = yield call(
    postApi.requestDeletePostService,
    action.token,
    action.slug,
    action.data
  );

  if (results.status >= 200 && results.status < 400) {
    yield put({
      type: DELETE_POST_SUCCESS,
      success: results.data.message,
    });
    console.log(results);
  } else if (results.response.status >= 400 && results.response.status < 600) {
    console.log("saga", results);
    yield put({
      type: DELETE_POST_FAILED,
      error: results.response.data.message,
    });
  }
}

function* sagaWatcher() {
  yield takeLatest(REGISTER_USER, registerUser);
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(LOGOUT_USER, logoutUser);
  yield takeLatest(UPDATE_PROFILE, updateProfile);
  yield takeEvery(CREATE_POST, createPost);
  yield takeEvery(FETCH_POSTS, fetchPosts);
  yield takeLatest(UPDATE_POST, updatePost);
  yield takeLatest(DELETE_POST, deletePost);
}

export default sagaWatcher;
