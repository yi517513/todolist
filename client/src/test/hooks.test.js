import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Hooks from "./hooks";

// 假設fetchData是一個獨立的模塊
// jest.mock("./fetchData");

describe("hooksComponet", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("檢查初始狀態(Loading...)是否正確顯示", () => {
    // 模擬一個fetch函數並將其返回值設為null
    const mockFetchData = jest.fn().mockResolvedValue(null);
    render(<Hooks fetchData={mockFetchData} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("檢查是否正確獲取並顯示數據", async () => {
    const mockData = "Hello";
    // 模擬一個fetch函數並將其返回值設為mockData
    const mockFetchData = jest.fn().mockResolvedValue(mockData);

    render(<Hooks fetchData={mockFetchData} />);

    // 等待帶有"Hello"字串的DOM出現在螢幕上
    await waitFor(() => expect(screen.getByText(mockData)).toBeInTheDocument());

    expect(mockFetchData).toHaveBeenCalledTimes(1);
  });

  test("檢查fetchDataCallback是否正確地被調用並獲取數據", async () => {
    const mockFetchData = jest.fn().mockResolvedValue("Test Data");

    render(<Hooks fetchData={mockFetchData} />);

    await waitFor(() =>
      expect(screen.getByText("Test Data")).toBeInTheDocument()
    );

    expect(mockFetchData).toHaveBeenCalledTimes(1);
  });
});
