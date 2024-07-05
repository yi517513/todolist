import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import DoubleButton from "./doubleButton";
import store from "./store/store";

test("點擊按鈕切換state狀態，同時根據狀態決定輸入框使用哪一種class，且這兩個按鈕只會顯示其中一個", () => {
  const { container } = render(
    <Provider store={store}>
      <DoubleButton />
    </Provider>
  );

  // 初始狀態 - 輸入框className=open、按鈕 = close
  const inputElement = container.querySelector("input");
  const closeButton = screen.getByText(/close/i);
  expect(inputElement.className).toBe("open");
  expect(closeButton).toBeInTheDocument();

  // 確認不存在open按鈕
  const openButtonBeforeClick = screen.queryByText(/open/i);
  expect(openButtonBeforeClick).toBeNull();

  // 點擊
  fireEvent.click(closeButton);

  // 變更狀態 - 輸入框className=close、按鈕 = open
  expect(inputElement.className).toBe("close");
  const openButtonAfterClick = screen.getByText(/open/i);
  expect(openButtonAfterClick).toBeInTheDocument();

  // 確認不存在close按鈕
  const closeButtonAfterClick = screen.queryByText(/close/i);
  expect(closeButtonAfterClick).toBeNull();
});
