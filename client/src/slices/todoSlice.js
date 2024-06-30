import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TodoService from "../services/todo.service";
import { gernerateTime } from "../services/date.service";

// 將saveTodo改寫成createAsyncThunk
export const saveTodo = createAsyncThunk(
  "todo/save",
  async ({ todoID, text, check }, thunkAPI) => {
    const state = thunkAPI.getState();
    const { token } = state.auth || "";
    const { _id: userID } = state.auth.user || "";
    const updateDate = gernerateTime();

    const tempTodo = { ...state.todos[todoID], text, check, updateDate };
    localStorage.setItem(`todo_${todoID}`, JSON.stringify(tempTodo));
    if (!token && !userID)
      return thunkAPI.rejectWithValue("No token or userID");

    try {
      await TodoService.saveTodo(
        text,
        check,
        userID,
        todoID,
        token,
        updateDate
      );
      return { todoID, text, check, updateDate };
    } catch (error) {
      //error.response.data-如果error.response不存在，則會拋出TypeError
      //error.response?.data-使用可選鏈運算符，如果error.response不存在，返回undefined
      const errorMessage = error.response?.data || error.message;
      console.log(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
// edit createAsyncThunk
export const updateTodo = createAsyncThunk(
  "todo/update",
  async ({ todoID, text, check }, thunkAPI) => {
    const state = thunkAPI.getState();
    const { token } = state.auth;
    const { _id: userID } = state.auth.user;
    const updateDate = gernerateTime();

    const tempTodo = { ...state.todos[todoID], text, check, updateDate };
    localStorage.setItem(`todo_${todoID}`, JSON.stringify(tempTodo));
    if (!token && !userID)
      return thunkAPI.rejectWithValue("No token or userID");

    try {
      await TodoService.updateTodo(
        text,
        check,
        userID,
        todoID,
        token,
        updateDate
      );
      return { todoID, text, check, updateDate };
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// delete createAsyncThunk

const todoSlice = createSlice({
  name: "todos",
  initialState: {},
  reducers: {
    newTodo: (state) => {
      const todoID = gernerateTime();
      state[todoID] = {
        todoID,
        text: "",
        isEditing: true,
        check: false,
        isLoading: false,
        error: null,
        updateDate: null,
        isLocal: true,
      };
    },
    setTodo(state, action) {
      const { todoID, text, check, updateDate } = action.payload;
      state[todoID] = {
        todoID,
        text,
        isEditing: false,
        check,
        updateDate,
      };
    },
    deleteTodo: (state, action) => {
      const todoID = action.payload;
      delete state[todoID];
      localStorage.removeItem(`todo_${todoID}`);
    },
    toggleEditingTodo: (state, action) => {
      const todo = state[action.payload];
      if (todo) {
        todo.isEditing = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveTodo.pending, (state, action) => {
        // payload只有在非同步成功才能獲取到，它包含的是操作返回的結果
        // action.meta.arg表示傳遞給非同步的初始參數，任何狀態下都可使用
        const { todoID } = action.meta.arg;
        state[todoID].isLoading = false;
        state[todoID].error = null;
      })
      .addCase(saveTodo.fulfilled, (state, action) => {
        const { todoID, text, check, updateDate } = action.payload;
        state[todoID].text = text;
        state[todoID].isEditing = false;
        state[todoID].isLoading = false;
        state[todoID].error = null;
        state[todoID].check = check;
        state[todoID].isLocal = false;
        state[todoID].updateDate = updateDate;
      })
      .addCase(saveTodo.rejected, (state, action) => {
        const { todoID } = action.meta.arg;
        state[todoID].isLoading = false;
        state[todoID].error = action.payload;
      })
      .addCase(updateTodo.pending, (state, action) => {
        const { todoID } = action.meta.arg;
        state[todoID].isLoading = true;
        state[todoID].error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { todoID, text, check, updateDate } = action.payload;
        state[todoID].isEditing = false;
        state[todoID].isLoading = false;
        state[todoID].error = null;
        state[todoID].check = check;
        state[todoID].text = text;
        state[todoID].updateDate = updateDate;
        if (check) {
          state[todoID].isEditing = null;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        const { todoID } = action.meta.arg;
        state[todoID].isLoading = false;
        state[todoID].error = action.payload;
      });
  },
});

export const { setTodo, newTodo, deleteTodo, toggleEditingTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
