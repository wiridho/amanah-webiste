import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/AuthReducer";
import BalanceReducer from "./reducer/Balance/BalanceReducer";

const reducers = combineReducers({
  auth: AuthReducer,
  balance: BalanceReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "DESTROY_SESSION") state = undefined;
  return reducers(state, action);
};

export default rootReducer;
