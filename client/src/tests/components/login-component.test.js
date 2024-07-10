import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginComponent from "../../components/login-component";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { login } from "../../slices/authSlice";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("LoginComponent.test - 組件操作與redux的交互", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
        token: null,
      },
    });
  });
  afterEach(() => {
    store.clearActions();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginComponent />
        </BrowserRouter>
      </Provider>
    );

  test("渲染LoginComponent,模擬用戶輸入", () => {
    renderComponent();
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(emailInput.value).toBe("user@test.com");
    expect(passwordInput.value).toBe("password");
  });

  test("pending狀態", () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByText(/Login/i);

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.click(loginButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(
      expect.objectContaining({
        type: login.pending.type,
        meta: expect.objectContaining({
          arg: { email: "user@test.com", password: "password" },
        }),
      })
    );
  });

  test("fulfilled狀態", async () => {
    store = mockStore({
      auth: {
        user: { email: "user@test.com" },
        isLoading: false,
        isAuthenticated: true,
        error: null,
        token: "test-token",
      },
    });

    renderComponent();

    store.dispatch({
      type: login.fulfilled.type,
      payload: { token: "test-token" },
    });

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(
        expect.objectContaining({
          type: login.fulfilled.type,
          payload: expect.objectContaining({
            token: "test-token",
          }),
        })
      );
    });
  });

  test("rejected狀態", async () => {
    const consoleError = console.error;
    // 暫時禁用console.error，以避免錯誤訊息干擾
    console.error = jest.fn();

    store = mockStore({
      auth: {
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: "Invalid credentials",
        token: null,
      },
    });

    renderComponent();

    store.dispatch({
      type: login.rejected.type,
      payload: { error: "Network Error" },
    });

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByText(/Login/i);

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(
        expect.objectContaining({
          type: login.rejected.type,
          payload: expect.objectContaining({ error: "Network Error" }),
        })
      );
    });

    // 確認出現錯誤訊息
    await waitFor(() => {
      const errorDiv = screen.getByText(/Network Error/i);
      expect(errorDiv).toBeInTheDocument();
    });
    // 測試結束後恢復
    console.error = consoleError;
  });
});
