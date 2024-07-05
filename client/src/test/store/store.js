import { configureStore } from "@reduxjs/toolkit";
import tripleButtonSlice from "../slices/tripleButtonSlice";
import doubleButtonSlice from "../slices/doubleButtonSlice";
import changeStateSlice from "../slices/changeStateSlice";

const store = configureStore({
  reducer: {
    triple: tripleButtonSlice,
    double: doubleButtonSlice,
    change: changeStateSlice,
  },
});

export default store;
