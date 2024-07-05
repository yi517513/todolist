import { add } from "./math";

test("adds 1+2 to equal 3", () => {
  // 語法寫錯 - TypeError: add(...).toBe is not a function
  //   expect(add(1, 2).toBe(3));
  expect(add(1, 2)).toBe(3);
});

test("adds -1+ -1 to equal -2", () => {
  expect(add(-1, -1)).toBe(-2);
});
