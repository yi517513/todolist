import { createSlice } from "@reduxjs/toolkit";
import DateService from "../services/date.service";

const configSlice = createSlice({
  name: "config",
  initialState: { open: false, day: 0 },
  reducers: {
    setOpen: (state) => {
      state.open = !state.open;
    },
    changeDay: (state, action) => {
      const day = action.payload;
      state.day += Number(day);
    },
  },
});

export const { setOpen, changeDay } = configSlice.actions;
export default configSlice.reducer;
