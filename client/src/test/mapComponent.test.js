import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MapComponent from "./mapComponent";
import { Provider } from "react-redux";
import store from "./store/store";

test("從MapComponent透過按鈕新增testComponent", () => {
  const { container } = render(
    <Provider store={store}>
      <MapComponent />
    </Provider>
  );

  // 初始狀態下，在MapComponent中應該沒有TestComponent被渲染
  expect(screen.queryAllByPlaceholderText(/ID:/i)).toHaveLength(0);

  // 在MapComponent點擊按鈕，會在reducer中會新增ID (1,2,3,...)
  fireEvent.click(screen.getByText(/newItem/i));

  // 透過map根據已有的ID逐個render出testComponent
  const inputElement1 = container.querySelector("input");
  expect(inputElement1).toBeInTheDocument();

  // 確認TestComponent中輸入框的placeholder會顯示ID: 1
  expect(screen.getByPlaceholderText(/ID: 1/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/newItem/i));
  const inputElement2 = container.querySelector("input");
  expect(inputElement2).toBeInTheDocument();

  // 確認TestComponent中輸入框的placeholder會顯示ID: 2
  expect(screen.getByPlaceholderText(/ID: 2/i)).toBeInTheDocument();

  // 確認現在共有兩個TestComponent被渲染
  expect(screen.queryAllByPlaceholderText(/ID:/i)).toHaveLength(2);
});
