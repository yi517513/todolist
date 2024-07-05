import React from "react";
import { render, screen, act } from "@testing-library/react";
import DelayedButton from "./DelayedButton";
import "@testing-library/jest-dom";

// 告知jest使用假的計數器函數
jest.useFakeTimers();

test("button appears after 5 seconds", () => {
  render(<DelayedButton />);

  // 在5秒前按鈕不應該存在
  expect(screen.queryByText(/Click Me/i)).toBeNull();

  // 使用act快進5秒
  // 使用act()確保所有相關的狀態更新和side effects都被正確處理
  // side effects 通常是指那些與純粹計算和渲染邏輯無關的操作
  // side effects - fetch、axios、setTimeout、setInterval、document.querySelector、document.getElementById
  act(() => {
    jest.advanceTimersByTime(5000);
  });

  // 現在按鈕存在了
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});
