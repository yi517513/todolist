import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

test("calls onSubmit prop with input value when form is submitted", () => {
  const handleSubmit = jest.fn();
  render(<Form onSubmit={handleSubmit} />);
  // 通常指<input>或<textarea> - 找到輸入框
  const inputElement = screen.getByRole("textbox");
  const buttonElement = screen.getByRole("button", { name: /Submit/i });
  // 改變輸入框的值 - test value
  fireEvent.change(inputElement, { target: { value: "test value" } });
  fireEvent.click(buttonElement);
  expect(handleSubmit).toHaveBeenCalledTimes(1);
  // 確認handleSubmit是否正確接收了輸入框的值
  expect(handleSubmit).toHaveBeenCalledWith("test value");
});
