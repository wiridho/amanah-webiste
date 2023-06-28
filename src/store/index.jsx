import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/AuthReducer";
import BalanceReducer from "./reducer/Balance/BalanceReducer";
import BalanceAccountReducer from "./reducer/Balance/BalanceAccountReducer";
import BalanceTransactionReducer from "./reducer/Balance/BalanceTransactionReducer";

const reducers = combineReducers({
  auth: AuthReducer,
  balance: BalanceReducer,
  balance_transaction: BalanceTransactionReducer,
  balance_account: BalanceAccountReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "DESTROY_SESSION") state = undefined;
  return reducers(state, action);
};

export default rootReducer;
