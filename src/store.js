import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customer/customerSlice";
import { configureStore } from "@reduxjs/toolkit";

// import { applyMiddleware, combineReducers, createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// const reducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
