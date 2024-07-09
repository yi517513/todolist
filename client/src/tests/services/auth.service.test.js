import React from "react";
import { fireEvent } from "@testing-library/react";
import AuthService from "../../services/auth.service";
import axios from "axios";

jest.mock("axios");

describe("AuthService", () => {
  afterEach(() => jest.clearAllMocks());

  const AUTH_API_URL = "http://localhost:8080/api/user";

  test("register success", async () => {
    const mockResponse = {
      username: "test123",
      email: "test123@gmail.com",
      password: "test123",
    };

    axios.post.mockResolvedValue(mockResponse);
    const result = await AuthService.register(
      "test123",
      "test123@gmail.com",
      "test123"
    );

    expect(axios.post).toHaveBeenCalledWith(AUTH_API_URL + "/register", {
      username: "test123",
      email: "test123@gmail.com",
      password: "test123",
    });

    expect(result).toEqual(mockResponse);
  });

  test("login success", async () => {
    const mockResponse = { email: "test123@gmail.com", password: "test123" };
    axios.post.mockResolvedValue(mockResponse);

    const result = await AuthService.login("test123@gmail.com", "test123");
    expect(axios.post).toHaveBeenCalledWith(AUTH_API_URL + "/login", {
      email: "test123@gmail.com",
      password: "test123",
    });
    expect(result).toEqual(mockResponse);
  });
});
