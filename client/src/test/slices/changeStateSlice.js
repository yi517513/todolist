import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  changeState: false,
};

const changeStateSlice = createSlice({
  name: "changeState",
  initialState,
  reducers: {
    toggleChangeState(state) {
      state.changeState = !state.changeState;
    },
  },
});

export const { toggleChangeState } = changeStateSlice.actions;
export default changeStateSlice.reducer;
