import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import DelayForm from "./DelayForm";

jest.useFakeTimers();

test("點擊按鈕後等待5秒顯示表單，並在表單提交時調用onSubmit prop", () => {
  const handleSubmit = jest.fn();

  // 渲染組件，但不代表立即顯示
  render(<DelayForm onSubmit={handleSubmit} />);

  // 點擊按鈕後5秒顯示表單
  const visbilityButtonElement = screen.getByText(/Show Form/i);
  fireEvent.click(visbilityButtonElement);
  act(() => {
    jest.advanceTimersByTime(5000);
  });

  // 確認表單顯示
  const inputElement = screen.getByRole("textbox");
  const buttonElement = screen.getByRole("button", { name: /Submit/i });

  fireEvent.change(inputElement, { target: { value: "test123" } });
  fireEvent.click(buttonElement);
  // 確認表單提交
  expect(handleSubmit).toHaveBeenCalledWith("test123");

  // 點擊隱藏表單按鈕
  fireEvent.click(screen.getByText(/Hide Form/i));
  act(() => {
    jest.advanceTimersByTime(5000);
  });

  // 確認表單隱藏
  expect(screen.queryByRole("textbox")).toBeNull();
});
