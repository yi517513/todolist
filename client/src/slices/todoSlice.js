import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TodoService from "../services/todo.service";
import DateService from "../services/date.service";

// 將saveTodo改寫成createAsyncThunk
export const saveTodo = createAsyncThunk(
  "todo/save",
  async ({ todoID, text, check }, thunkAPI) => {
    console.log(todoID);
    const state = thunkAPI.getState();
    const { token } = state.auth || "";
    const { _id: userID } = state.auth.user || "";
    const updatedAt = DateService.gernerateTime();

    const updateTodo = { ...state.todos[todoID], text, check, updatedAt };
    updateLocalStorage(todoID, updateTodo);
    if (!token && !userID) return { todoID, text, check, updatedAt };

    try {
      await TodoService.saveTodo(text, check, userID, todoID, token, updatedAt);
      return { todoID, text, check, updatedAt };
    } catch (error) {
      //error.response.data-如果error.response不存在，則會拋出TypeError
      //error.response?.data-使用可選鏈運算符，如果error.response不存在，返回undefined
      const errorMessage = error.response?.data || error.message;
      console.log(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
// edit AsyncThunk
export const updateTodo = createAsyncThunk(
  "todo/update",
  async ({ todoID, text, check }, thunkAPI) => {
    const state = thunkAPI.getState();
    const { token } = state.auth;
    const { _id: userID } = state.auth.user || "";
    const updatedAt = DateService.gernerateTime();

    const updatedTodo = { ...state.todos[todoID], text, check, updatedAt };
    updateLocalStorage(todoID, updatedTodo);
    if (!token && !userID) {
      console.log(3);
      return { todoID, text, check, updatedAt };
    }

    try {
      await TodoService.updateTodo(
        text,
        check,
        userID,
        todoID,
        token,
        updatedAt
      );
      return { todoID, text, check, updatedAt };
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const updateLocalStorage = (todoID, todo) => {
  localStorage.setItem(`todo_${todoID}`, JSON.stringify(todo));
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {},
  reducers: {
    // 新增todo component
    newTodo: (state) => {
      const todoID = DateService.gernerateTime();
      state[todoID] = {
        todoID,
        text: "",
        isEditing: true,
        check: false,
        isLoading: false,
        error: null,
        updatedAt: null,
      };
    },
    setTodoItem: (state, action) => {
      const { todoID, text, check, updatedAt, witchDay } = action.payload;
      if (todoID === undefined) {
        console.error("Invalid payload: ", action.payload);
        return;
      }
      if (updatedAt.substring(4, 8) === witchDay) {
        state[todoID] = {
          todoID,
          text,
          isEditing: false,
          check,
          updatedAt,
        };
      }
    },
    // 清除state中的todos
    clearAllTodos: (state) => {
      return {};
    },
    removeTodo: (state, action) => {
      const todoID = action.payload;
      delete state[todoID];
    },
    toggleEditingTodo: (state, action) => {
      const todoID = action.payload;
      const todo = state[todoID];
      todo.isEditing = true;
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
        const { todoID, text, check, updatedAt } = action.payload;
        state[todoID].text = text;
        state[todoID].isEditing = false;
        state[todoID].isLoading = false;
        state[todoID].error = null;
        state[todoID].check = check;
        state[todoID].isLocal = false;
        state[todoID].updatedAt = updatedAt;
      })
      .addCase(saveTodo.rejected, (state, action) => {
        const { todoID } = action.meta.arg;
        console.log(todoID);
        state[todoID].isLoading = false;
        state[todoID].error = action.payload;
      })
      .addCase(updateTodo.pending, (state, action) => {
        const { todoID } = action.meta.arg;
        state[todoID].isLoading = true;
        state[todoID].error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { todoID, text, check, updatedAt } = action.payload;
        state[todoID].isEditing = false;
        state[todoID].isLoading = false;
        state[todoID].error = null;
        state[todoID].check = check;
        state[todoID].text = text;
        state[todoID].updatedAt = updatedAt;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        const { todoID } = action.meta.arg;
        state[todoID].isLoading = false;
        state[todoID].error = action.payload;
      });
  },
});

export const {
  setTodoItem,
  newTodo,
  removeTodo,
  toggleEditingTodo,
  clearAllTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
