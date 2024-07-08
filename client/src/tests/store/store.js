import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../slices/authSlice";

const initialState = {
  auth: {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    token: null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: initialState,
});

export default store;
