import authSlice, { register } from "../../slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { thunk } from "redux-thunk";

jest.mock("axios");

const initializeStore = (preloadedState = {}) => {
  return configureStore({
    reducer: { auth: authSlice },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    preloadedState,
  });
};

const initialAuthState = {
  user: {},
  isLoading: false,
  isAuthenticated: false,
  error: null,
  token: null,
};

describe("authSlice.test - actions的調用與state的狀態", () => {
  let store;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    test("pending", () => {
      store = initializeStore({ auth: initialAuthState });
      store.dispatch(
        register({
          username: "test123",
          email: "test123@gmail.com",
          password: "test123",
        })
      );
      const state = store.getState().auth;
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });
    test("fulfilled", async () => {
      const userData = { username: "test123", email: "test123@gmail.com" };
      axios.post.mockResolvedValueOnce({ data: userData });

      await store.dispatch(
        register({
          username: "test123",
          email: "test123@gmail.com",
          password: "test123",
        })
      );

      const state = store.getState().auth;
      expect(state.isLoading).toBe(false);
      expect(state.user).toBe(userData);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe(null);
    });
    test("rejected", () => {});
  });

  describe("login", () => {
    test("pending", () => {});
    test("fulfilled", () => {});
    test("rejected", () => {});
  });

  describe("logout and setUser actions", () => {
    beforeEach(() => {
      store = initializeStore({ auth: initialAuthState });
    });
    test("logout", () => {});
    test("setUser", () => {});
  });
});
