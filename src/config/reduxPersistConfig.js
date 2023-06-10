import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import reducers from "../store";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

/**
 * Configuration for store redux.
 */
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
