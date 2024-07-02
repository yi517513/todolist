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
import TodoService from "./services/todo.service";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  // 啟動時，執行initialize，有token(登入)就會同步資料到DB，沒token(離線)不執行同步
  useEffect(() => {
    const initialize = async () => {
      const tokenFromStroage = localStorage.getItem("token");
      if (tokenFromStroage) {
        try {
          const user = await AuthService.getCurrentUser(tokenFromStroage);
          dispatch(setUser({ user, token: tokenFromStroage }));

          const localTodos = Object.keys(localStorage)
            .filter((key) => key.startsWith("todo_"))
            .map((key) => JSON.parse(localStorage.getItem(key)));

          // 上傳到DB
          await TodoService.syncTodos(tokenFromStroage, localTodos);
          // 下載到本地
          const todosFromDB = await TodoService.getAllTodo(tokenFromStroage);
          if (todosFromDB.data) {
            todosFromDB.data.forEach((todo) => {
              const { date, userID, __v, _id, ...cleanTodo } = todo;
              localStorage.setItem(
                `todo_${cleanTodo.todoID}`,
                JSON.stringify(cleanTodo)
              );
            });
          }
        } catch (e) {
          console.log("Error during initialization:", e);
        }
      }
    };
    initialize();
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
