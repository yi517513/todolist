import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TripleButton from "./tripleButton.js";
import store from "./store/store.js";
import { Provider } from "react-redux";

// 場上只會顯示三個物件，一個輸入欄位，一個edit按鈕，一個三合一的按鈕(restrict、complete、remove按狀態顯示)
// 輸入欄位的class會隨著四個按鈕變更，按鈕都用狀態來稱呼

test("從狀態A(class為edit, restrict顯示, complete與remove隱藏)轉換到狀態B(class為restrict, complete顯示, restrict與remove隱藏)", () => {
  const { container } = render(
    <Provider store={store}>
      <TripleButton />
    </Provider>
  );

  const inputElement = container.querySelector("input");

  // 編輯狀態(狀態A)：輸入框class為edit，按鈕顯示restrict、edit，點擊restrict將變成限制狀態(狀態B)、點擊edit沒反應(狀態A)
  expect(inputElement.className).toBe("edit");
  expect(screen.getByText(/restrict/i)).toBeInTheDocument();
  expect(screen.getByText(/edit/i)).toBeInTheDocument();
  expect(screen.queryByText(/complete/i)).toBeNull();
  expect(screen.queryByText(/remove/i)).toBeNull();

  // 點擊restrict，進入狀態B
  fireEvent.click(screen.getByText(/restrict/i));

  // 限制狀態(狀態B) : 輸入框class為restrict，按鈕顯示complete、edit，點擊edit將變成編輯模式(狀態A)，或者點擊complete到完成模式(狀態C)
  expect(inputElement.className).toBe("restrict");
  expect(screen.getByText(/complete/i)).toBeInTheDocument();
  expect(screen.getByText(/edit/i)).toBeInTheDocument();
  expect(screen.queryByText(/restrict/i)).toBeNull();
  expect(screen.queryByText(/remove/i)).toBeNull();
});

test("從狀態B轉換到狀態A, 或轉換到狀態C(class為complete,remove顯示, restrict與complete隱藏, edit唯讀)", () => {
  const { container } = render(
    <Provider store={store}>
      <TripleButton />
    </Provider>
  );

  // 轉換到狀態B
  // fireEvent.click(screen.getByText(/restrict/i));
  const inputElement = container.querySelector("input");

  // 限制狀態(狀態B)
  expect(inputElement.className).toBe("restrict");
  expect(screen.getByText(/complete/i)).toBeInTheDocument();
  expect(screen.getByText(/edit/i)).toBeInTheDocument();
  expect(screen.queryByText(/restrict/i)).toBeNull();
  expect(screen.queryByText(/remove/i)).toBeNull();

  // 從限制狀態(狀態B)回到編輯狀態(狀態A)
  fireEvent.click(screen.getByText(/edit/i));

  // 編輯狀態(狀態A)
  expect(inputElement.className).toBe("edit");
  expect(screen.getByText(/restrict/i)).toBeInTheDocument();
  expect(screen.getByText(/edit/i)).toBeInTheDocument();
  expect(screen.queryByText(/complete/i)).toBeNull();
  expect(screen.queryByText(/remove/i)).toBeNull();

  // 再次回到(狀態B)
  fireEvent.click(screen.getByText(/restrict/i));
  // 從(狀態B)轉換到(狀態C)
  fireEvent.click(screen.getByText(/complete/i));

  // 完成狀態(狀態C):輸入框class為complete，按鈕顯示remove、edit，edit唯讀
  expect(inputElement.className).toBe("complete");
  expect(screen.getByText(/remove/i)).toBeInTheDocument();
  expect(screen.getByText(/edit/i)).toBeInTheDocument();
  expect(screen.queryByText(/complete/i)).toBeNull();
  expect(screen.queryByText(/restrict/i)).toBeNull();

  // 監視console.log函數，並返回監視器的引用
  const consoleSpy = jest.spyOn(console, "log");
  fireEvent.click(screen.getByText(/remove/i));
  // 驗證console.log被正確調用
  expect(consoleSpy).toHaveBeenCalledWith("remove clicked");
  // 恢復console.log，防止監視器影響其他測試
  consoleSpy.mockRestore();
});
