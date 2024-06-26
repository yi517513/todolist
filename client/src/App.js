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

function App() {
  const dispatch = useDispatch();

  // 啟動時，檢查localstroage是否有token，若有就被添加到redux狀態中
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = await AuthService.getCurrentUser(token);
          dispatch(setUser({ user, token }));
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUser();
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
