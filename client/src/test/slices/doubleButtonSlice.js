import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenClass: true,
  isCloseClass: false,
};

const doubleButtonSlice = createSlice({
  name: "doubleButton",
  initialState,
  reducers: {
    setOpenClass(state) {
      state.isOpenClass = true;
      state.isCloseClass = false;
    },
    setCloseClass(state) {
      state.isOpenClass = false;
      state.isCloseClass = true;
    },
  },
});

export const { setOpenClass, setCloseClass } = doubleButtonSlice.actions;
export default doubleButtonSlice.reducer;
