import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store/store";
import ChangeState from "./ChangeState";

test("點擊按鈕後更新redux狀態", () => {
  render(
    <Provider store={store}>
      <ChangeState />
    </Provider>
  );
  const button = screen.getByText("Toggle State");
  const stateText = screen.getByText("Current State: false");

  // 檢查初始狀態
  expect(stateText).toBeInTheDocument();
  fireEvent.click(button);

  // 檢查狀態變化
  expect(screen.getByText("Current State: true")).toBeInTheDocument();
});
