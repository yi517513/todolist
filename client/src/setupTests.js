// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

console.log("setupTests.js loaded");

// 模擬localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      console.log("localStorage.getItem called with key:", key);
      return store[key] || null;
    },
    setItem(key, value) {
      console.log(
        "localStorage.setItem called with key:",
        key,
        "value:",
        value
      );
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});
