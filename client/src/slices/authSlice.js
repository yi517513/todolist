import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";

// const token = localStorage.getItem("token");
// 定義初始狀態
const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  token: localStorage.getItem("token") || null,
};

// 定義非同步操作
export const register = createAsyncThunk(
  // 第一個參數：定義 thunk 的名稱
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password);
      return response.data;
    } catch (error) {
      // 如果出錯，使用 thunkAPI.rejectWithValue 返回錯誤信息作為 action payload
      const errorMessage = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const response = await AuthService.verifytoken(token);
      if (response.data.success) {
        try {
          await AuthService.getCurrentUser(token);
          return state.auth.user;
        } catch (error) {
          return thunkAPI.rejectWithValue("Can not found User");
        }
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Invalid token");
    }
  }
);

// 創建 slice
// 在extraReducers中處理createAsyncThunk生成的action types，以管理異步操作的不同狀態（pending, fulfilled, rejected）
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setUser(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export const { setUser, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
