import { configureStore } from "@reduxjs/toolkit";
import tripleButtonSlice from "../slices/tripleButtonSlice";
import doubleButtonSlice from "../slices/doubleButtonSlice";
import changeStateSlice from "../slices/changeStateSlice";
import mapComponentSlice from "../slices/mapComponentSlice";

const store = configureStore({
  reducer: {
    triple: tripleButtonSlice,
    double: doubleButtonSlice,
    change: changeStateSlice,
    map: mapComponentSlice,
  },
});

export default store;
