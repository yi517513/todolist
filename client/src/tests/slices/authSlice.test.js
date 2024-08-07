import { login, logout, register, setUser } from "../../slices/authSlice";
import axios from "axios";
import createStore from "../store/store";
import "../loclStorageMock";

jest.mock("axios");

const initialAuthState = {
  user: {},
  isLoading: false,
  isAuthenticated: false,
  error: null,
  token: null,
};

describe("authSlice.test - actions的調用與state的狀態", () => {
  let store;
  beforeEach(() => {
    jest.spyOn(localStorage, "setItem");
    jest.spyOn(localStorage, "removeItem");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("authSlice - register thunk", () => {
    store = createStore({ auth: initialAuthState });
    test("register thunk pending state", () => {
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
    test("register thunk fulfilled state", async () => {
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
    test("register thunk rejected state", async () => {
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

  describe("authSlice - login thunk", () => {
    store = createStore({ auth: initialAuthState });
    test("login thunk pending state", async () => {
      store.dispatch(
        login({ email: "test123@gmail.com", password: "test123" })
      );
      const state = store.getState().auth;
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });
    test("login thunk fulfilled state", async () => {
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
    test("login thunk rejected state", () => {});
  });

  describe("logout and setUser actions", () => {
    test("logout - remove token from localStorage", () => {
      store = createStore({
        auth: {
          ...initialAuthState,
          isAuthenticated: true,
          token: "testToken",
        },
      });
      store.dispatch(logout());
      const state = store.getState().auth;
      expect(state.user).toBe(null);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe(null);
      expect(state.token).toBe(null);
      expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    });
    test("setUser ", () => {
      const user = { username: "test123" };
      store.dispatch(setUser({ user }));
      const state = store.getState().auth;
      expect(state.user).toEqual(user);
      expect(state.isAuthenticated).toBe(true);
    });
  });
});
