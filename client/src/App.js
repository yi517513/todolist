import "./style/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TodoComponent from "./components/todo-component";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./slices/authSlice";
import AuthService from "./services/auth.service";
import { setTodo } from "./slices/todoSlice";
import TodoService from "./services/todo.service";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  // 啟動時，檢查localstroage是否有token，若有就被添加到redux狀態中
  useEffect(() => {
    const fetchUser = async () => {
      const tokenFromStorage = localStorage.getItem("token");
      if (tokenFromStorage) {
        try {
          const user = await AuthService.getCurrentUser(tokenFromStorage);
          dispatch(setUser({ user, token: tokenFromStorage }));
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    // 使用useSelector獲取token確保token是最新的
    // 當token發生改變時useEffect會再次執行
    const fetchTodo = async () => {
      if (token) {
        try {
          const response = await TodoService.getAllTodo(token);
          const todoFromDB = response.data;
          todoFromDB.map((todo) => {
            // 解構出不需要的屬性
            let { date, userID, __v, _id, ...cleanTodo } = todo;
            localStorage.setItem(`todo_${todo.id}`, JSON.stringify(cleanTodo));
          });
          // console.log(todoFromDB);

          // Object.keys適用於獲取物件中所有可枚舉屬性名的方法
          // 在這context中Object.keys(localStorage)是為了獲取localStorage中所有存儲的key
          Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("todo_")) {
              const todo = JSON.parse(localStorage.getItem(key));
              dispatch(setTodo(todo));
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchUser();
    fetchTodo();
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeComponent />} />
          <Route path="/todo" element={<TodoComponent />}></Route>
          <Route path="/register" element={<RegisterComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/profile" element={<ProfileComponent />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
