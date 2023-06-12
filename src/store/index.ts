import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
	auth: authReducer
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
	enhancers: [composeWithDevTools()]
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;