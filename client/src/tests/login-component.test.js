import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginComponent from "../components/login-component";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { login } from "../slices/authSlice";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    token: null,
  },
});

describe("LoginComponent", () => {
  test("渲染LoginComponent,模擬用戶輸入", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginComponent />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByText(/Login/i);

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(emailInput.value).toBe("user@test.com");
    expect(passwordInput.value).toBe("password");

    fireEvent.click(loginButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(
      login({ email: "user@test.com", password: "password" })
    );
  });
});
