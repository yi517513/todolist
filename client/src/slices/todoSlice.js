import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TodoService from "../services/todo.service";
import { gernerateTime } from "../services/date.service";

// 將saveTodo改寫成createAsyncThunk
export const saveTodo = createAsyncThunk(
  "todo/save",
  async ({ text, check, userID, id, token }, thunkAPI) => {
    const updateDate = gernerateTime();
    try {
      const response = await TodoService.saveTodo(
        text,
        check,
        userID,
        id,
        token,
        updateDate
      );
      return { message: response.data, updateDate };
    } catch (error) {
      //error.response.data-如果error.response不存在，則會拋出TypeError
      //error.response?.data-使用可選鏈運算符，如果error.response不存在，返回undefined
      const errorMessage = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
// edit createAsyncThunk
export const updateTodo = createAsyncThunk(
  "todo/update",
  async ({ text, check, userID, id, token }, thunkAPI) => {
    const updateDate = gernerateTime();
    try {
      const response = await TodoService.updateTodo(
        text,
        check,
        userID,
        id,
        token,
        updateDate
      );
      return { message: response.data, updateDate };
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
      const id = gernerateTime();
      state[id] = {
        id,
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
      const { id, text, check, updateDate } = action.payload;
      state[id] = {
        id,
        text,
        isEditing: false,
        check,
        updateDate,
      };
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      console.log(id);
      delete state[id];
      localStorage.removeItem(`todo_${id}`);
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
        const { id, text, check } = action.meta.arg;
        state[id].text = text;
        state[id].isEditing = false;
        state[id].isLoading = false;
        state[id].error = null;
        state[id].check = check;
        state[id].updateDate = Number(action.payload.updateDate);
        if (check) {
          state[id].isEditing = null;
        }
        localStorage.setItem(`todo_${id}`, JSON.stringify(state[id]));
      })
      .addCase(saveTodo.fulfilled, (state, action) => {
        const { id, text, check } = action.meta.arg;
        state[id].text = text;
        state[id].isEditing = false;
        state[id].isLoading = false;
        state[id].error = null;
        state[id].check = check;
        state[id].updateDate = Number(action.payload.updateDate);
        if (check) {
          state[id].isEditing = null;
        }
        localStorage.setItem(`todo_${id}`, JSON.stringify(state[id]));
      })
      .addCase(saveTodo.rejected, (state, action) => {
        const { id } = action.meta.arg;
        state[id].isLoading = false;
        state[id].error = action.payload;
      })
      .addCase(updateTodo.pending, (state, action) => {
        const { id, check, text } = action.meta.arg;
        state[id].isEditing = false;
        state[id].isLoading = false;
        state[id].error = null;
        state[id].check = check;
        state[id].text = text;
        state[id].updateDate = Number(action.payload.updateDate);
        if (check) {
          state[id].isEditing = null;
        }
        localStorage.setItem(`todo_${id}`, JSON.stringify(state[id]));
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { id, check, text } = action.meta.arg;
        state[id].isEditing = false;
        state[id].isLoading = false;
        state[id].error = null;
        state[id].check = check;
        state[id].text = text;
        state[id].updateDate = Number(action.payload.updateDate);
        if (check) {
          state[id].isEditing = null;
        }
        localStorage.setItem(`todo_${id}`, JSON.stringify(state[id]));
      })
      .addCase(updateTodo.rejected, (state, action) => {
        const { id } = action.meta.arg;
        state[id].isLoading = false;
        state[id].error = action.payload;
      });
  },
});

export const { setTodo, newTodo, deleteTodo, toggleEditingTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
