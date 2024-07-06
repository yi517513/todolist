import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 1,
  items: {},
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    newItem(state) {
      const id = state.counter;
      state.items[id] = {};
      state.counter += 1;
    },
  },
});

export const { newItem } = mapSlice.actions;
export default mapSlice.reducer;
