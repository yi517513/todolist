import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: { open: false, day: 0 },
  reducers: {
    setOpen: (state) => {
      state.open = !state.open;
    },
    changeDay: (state, action) => {
      state.day += action.payload;
    },
    selectDay: (state, action) => {
      state.day = action.payload;
    },
  },
});

export const { setOpen, changeDay, selectDay } = configSlice.actions;
export default configSlice.reducer;
