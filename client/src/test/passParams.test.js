import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PassParams from "./passParams";
import ReciveParamsService from "./reciveParamsService";
import AxiosService from "./axiosService";

jest.mock("./reciveParamsService");
jest.mock("./axiosService");

test("顯示輸入框並正確傳遞參數至ReciveParamsService", () => {
  render(<PassParams />);

  // 輸入框與按鈕是否正確顯示
  const inputElement = screen.getByPlaceholderText(/Input Text/i);
  expect(inputElement).toBeInTheDocument();
  expect(screen.getByText(/Params Submit/i)).toBeInTheDocument();

  // 模擬輸入並檢查參數傳遞
  fireEvent.change(inputElement, { target: { value: "test" } });

  // 輸入後點擊按鈕
  fireEvent.click(screen.getByText(/Params Submit/i));

  // 在Web應用中，失去焦點通常意味著用戶從一個輸入框轉移到另一個輸入框或元素
  // 例如，當你在輸入框中輸入完畢並點擊其他地方時，這個輸入框會觸發失去焦點事件
  // 失去焦點時會觸發ReciveParams
  fireEvent.blur(inputElement);

  // toHaveBeenCalledWith檢查mock函數是否使用特定的參數被調用過
  expect(ReciveParamsService.getParams).toHaveBeenCalledWith("test");
});

test("傳遞Name至axiosService", () => {
  render(<PassParams />);
  const inputElement = screen.getByPlaceholderText(/Input Name/i);
  const buttonElement = screen.getByText(/Name Submit/i);
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();

  fireEvent.change(inputElement, { target: { value: "Jack" } });
  fireEvent.click(buttonElement);

  fireEvent.blur(inputElement);

  expect(AxiosService.getAllData).toHaveBeenCalledWith("Jack");
});
