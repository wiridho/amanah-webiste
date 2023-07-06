import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './reducer/AuthReducer';
import BalanceReducer from './reducer/Balance/BalanceReducer';
import AdminReducer from './reducer/Admin/AdminReducer';

const reducers = combineReducers({
    auth: AuthReducer,
    balance: BalanceReducer,
    admin: AdminReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'DESTROY_SESSION') state = undefined;
    return reducers(state, action);
};

export default rootReducer;
