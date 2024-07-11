import authSlice, { register, login } from "../../slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import axios from "axios";

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

describe("authSlice - actions and state management", () => {
  let store;

  beforeEach(() => {
    store = initializeStore({ auth: initialAuthState });
    localStorage.clear();
    jest.spyOn(Storage.prototype, "setItem");
    jest.spyOn(Storage.prototype, "getItem");
    jest.spyOn(Storage.prototype, "removeItem");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    test("pending", () => {
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
      expect(state.user).toEqual(userData);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe(null);
    });

    test("rejected", async () => {
      const errorMessage = "Network Error";
      axios.post.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(
        register({
          username: "test123",
          email: "test123@gmail.com",
          password: "test123",
        })
      );

      const state = store.getState().auth;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe("login", () => {
    test("pending", () => {
      store.dispatch(
        login({ email: "test123@gmail.com", password: "test123" })
      );
      const state = store.getState().auth;
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    test("fulfilled", async () => {
      const token = "testToken";
      axios.post.mockResolvedValueOnce({ data: token });

      await store.dispatch(
        login({ email: "test123@gmail.com", password: "test123" })
      );

      const state = store.getState().auth;
      expect(state.isLoading).toBe(false);
      expect(state.token).toEqual(token);
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBe(null);

      expect(localStorage.setItem).toHaveBeenCalledWith("token", token);
    });

    test("rejected", async () => {
      const errorMessage = "Invalid credentials";
      axios.post.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(
        login({ email: "test123@gmail.com", password: "test123" })
      );

      const state = store.getState().auth;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe("logout and setUser actions", () => {
    test("logout action should remove token from localStorage", () => {
      store = initializeStore({
        auth: {
          ...initialAuthState,
          isAuthenticated: true,
          token: "testToken",
        },
      });
      store.dispatch(authSlice.actions.logout());
      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(false);
      expect(state.token).toBe(null);
      expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    });

    test("setUser action should update the user and isAuthenticated", () => {
      const user = { username: "newUser" };
      store.dispatch(authSlice.actions.setUser({ user }));
      const state = store.getState().auth;
      expect(state.user).toEqual(user);
      expect(state.isAuthenticated).toBe(true);
    });
  });
});
