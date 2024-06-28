import "./style/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TodoComponent from "./components/todo-component";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/authSlice";
import AuthService from "./services/auth.service";
import { setTodo } from "./slices/todoSlice";

function App() {
  const dispatch = useDispatch();

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

    const fetchTodo = () => {
      // Object.keys適用於獲取物件中所有可枚舉屬性名的方法
      // 在這context中Object.keys(localStorage)是為了獲取localStorage中所有存儲的key
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("todo_")) {
          const todo = JSON.parse(localStorage.getItem(key));
          dispatch(setTodo(todo));
        }
      });
    };
    fetchUser();
    fetchTodo();
  }, [dispatch]);

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
