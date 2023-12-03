import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import rootSaga from "./sagas";
import createSagaMiddleware from "@redux-saga/core";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { getPersistConfig } from "redux-deep-persist";

const userPersistConfig = getPersistConfig({
  key: "user",
  storage,
  whitelist: ["auth.token", "auth.user"],
  rootReducer,
});

const persistedReducer = persistReducer(userPersistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
