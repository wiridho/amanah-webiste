import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/AuthReducer";

const reducers = combineReducers({
  auth: AuthReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "DESTROY_SESSION") state = undefined;
  return reducers(state, action);
};

export default rootReducer;
