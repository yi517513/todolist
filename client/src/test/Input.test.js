import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

test("renders input with initial value", () => {
  render(<Input value="initial value" />);
  const inputElement = screen.getByDisplayValue(/initial value/i);
  expect(inputElement).toBeInTheDocument();
});

test("calls onChange prop when value changes", () => {
  const handleChange = jest.fn();
  render(<Input value="" onChange={handleChange} />);
  const inputElement = screen.getByDisplayValue("");
  fireEvent.change(inputElement, { target: { value: "new value" } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});
