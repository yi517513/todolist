import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import todoReducer from "../slices/todoSlice";
import configReducer from "../slices/configSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
    config: configReducer,
  },
});

export default store;
