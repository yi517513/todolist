import { saveToLocalStorage, getFromLocalStorage } from "./localStorage";

describe("localStorage", () => {
  beforeEach(() => {
    // test前清除所有的localstorage和mock
    localStorage.clear();
    // jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("save date to localStorage", () => {
    const key = "testKey";
    const value = { a: 1 };

    jest.spyOn(localStorage, "setItem");

    saveToLocalStorage(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });

  test("get data from localStorage", () => {
    const key = "testKey";
    const value = { a: 1 };

    jest.spyOn(localStorage, "setItem");

    localStorage.setItem(key, JSON.stringify(value));

    console.log("Stored value:", localStorage.getItem(key));

    const result = getFromLocalStorage(key);

    console.log("Retrieved value:", result);

    expect(result).toEqual(value);
  });

  test("return null if no data in localStorage", () => {
    const key = "noExistKey";

    const result = localStorage.getItem(key);

    expect(result).toBeNull();
  });
});
