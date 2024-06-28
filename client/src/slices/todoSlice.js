import { createSlice } from "@reduxjs/toolkit";
import { gernerateTime } from "../services/date.service";
import TodoService from "../services/todo.service";

const initialState = {};

// 將saveTodo改寫成createAsyncThunk
// edit createAsyncThunk
// check ?

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodo(state, action) {
      const { id, text, check } = action.payload;
      state[id] = {
        id,
        text,
        isEditing: false,
        check,
      };
    },
    addTodo: (state, action) => {
      const id = gernerateTime();
      state[id] = {
        id,
        text: action.payload || "",
        isEditing: true,
        check: false,
      };
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      console.log(id);
      delete state[id];
      localStorage.removeItem(`todo_${id}`);
    },
    editTodo: (state, action) => {
      const todo = state[action.payload];
      if (todo) {
        todo.isEditing = true;
      }
    },
    saveTodo: async (state, action) => {
      const { id, text, check, token, userID } = action.payload;
      console.log(id, text, check, token, userID);
      const todo = state[id];
      if (todo) {
        todo.text = text;
        todo.isEditing = false;
        localStorage.setItem(`todo_${id}`, JSON.stringify(todo));
        try {
          const addResult = await TodoService({
            id,
            text,
            check,
            token,
            userID,
          });
          console.log(addResult);
        } catch (e) {
          console.log(e);
        }
      }
    },
    checkTodo: (state, action) => {
      const id = action.payload;
      const todo = state[id];
      if (todo) {
        todo.check = true;
        localStorage.setItem(`todo_${id}`, JSON.stringify(todo));
      }
    },
  },
});

export const { setTodo, addTodo, deleteTodo, editTodo, saveTodo, checkTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
