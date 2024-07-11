import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../slices/authSlice";

const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });
};

export default createStore;
