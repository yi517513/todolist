import fetchData from "./data";
import axios from "axios";

// 模擬axios模組，可以避免在測試中進行真實的HTTP請求
jest.mock("axios");

// 定義一個名為“fetches successfully data from an API”的測試，該測試是一個異步函數
test("fetches successfully data from an API", async () => {
  const data = { name: "John" };
  // 模擬 axios.get 方法，使其返回一個解析值為 data 的 Promise。
  // 這意味著當 axios.get 被調用時，它將返回 { data: { name: "John" } }。
  axios.get.mockResolvedValue({ data });

  const result = await fetchData("https://api.example.com/user");
  // 斷言 result 應該等於 data。這驗證了 fetchData 函數是否正確地返回了模擬的數據。
  expect(result).toEqual(data);
});

test("fetches erroneously data from an API", async () => {
  const errorMessage = "Network error";
  axios.get.mockRejectedValue(new Error(errorMessage));

  // 這驗證了 fetchData 函數是否正確地處理了模擬的錯誤
  await expect(fetchData("https://api.example.com/user")).rejects.toThrow(
    errorMessage
  );
});
