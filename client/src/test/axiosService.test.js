import AxiosService from "./axiosService";
import axios from "axios";

jest.mock("axios");

describe("AxiosService", () => {
  afterEach(() => {
    // 在每個測試後清除模擬
    jest.clearAllMocks();
  });

  const URL = "www.test.com";

  test("getAllData() call axios.get()", async () => {
    const mockResponse = {
      data: { name: "John", age: 30, phoneNum: "12345678" },
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await AxiosService.getAllData("John");

    expect(axios.get).toHaveBeenCalledWith(URL, { name: "John" });
    expect(result).toEqual(mockResponse);
  });
  test("login() call axios.post()", async () => {
    const mockResponse = {
      token: "AAABBBCCC123",
      user: {
        id: "123456",
        name: "Jack",
        email: "Jack@gmail.com",
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    const result = await AxiosService.login("Jack@gmail.com", "password");

    expect(axios.post).toHaveBeenCalledWith(URL, {
      email: "Jack@gmail.com",
      password: "password",
    });

    expect(result).toEqual(mockResponse);
  });

  test("register calls axios.post()", async () => {
    const mockResponse = {
      message: "Success!",
    };
    axios.post.mockResolvedValue(mockResponse);

    const result = await AxiosService.register(
      "Tom",
      "Tom@gmail.com",
      "password123"
    );

    expect(axios.post).toHaveBeenCalledWith(URL, {
      username: "Tom",
      email: "Tom@gmail.com",
      password: "password123",
    });
    expect(result).toEqual(mockResponse);
  });
});
