import React from "react";
// render - 用來將React組件渲染到虛擬的DOM中
// screen - 提供了一系列的查找方法，用於從渲染的DOM中選取元素
// fireEvent - 用來觸發事件，例如點擊、鍵盤輸入等，以便模擬用戶行為
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

// 渲染具有正確標籤的按鈕
test("renders button with correct label", () => {
  render(<Button label="Click Me" />);
  const buttonElement = screen.getByText(/Click Me/i);
  // 使用expect斷言來檢查該按鈕元素是否存在於文件中
  expect(buttonElement).toBeInTheDocument();
});

// 點擊時調用onClick屬性
test("calls onClick prop when clicked", () => {
  // 創建了一個jest的模擬函數handleClick
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} label="Click Me" />);
  const buttonElement = screen.getByText(/Click Me/i);
  fireEvent.click(buttonElement);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
