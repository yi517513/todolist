import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditing: true,
  isRestrict: false,
  isComplete: false,
};

const tripleButtonSlice = createSlice({
  name: "triple",
  initialState,
  reducers: {
    toggleInputEditing(state) {
      state.isEditing = true;
      state.isRestrict = false;
      state.isComplete = false;
    },
    toggleInputRestrict(state) {
      state.isEditing = false;
      state.isRestrict = true;
      state.isComplete = false;
    },
    toggleInputComplete(state) {
      state.isEditing = false;
      state.isRestrict = false;
      state.isComplete = true;
    },
  },
});

export const { toggleInputEditing, toggleInputRestrict, toggleInputComplete } =
  tripleButtonSlice.actions;
export default tripleButtonSlice.reducer;
