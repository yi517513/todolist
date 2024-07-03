import "./style/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TodoComponent from "./components/todo-component";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import useAuth from "./hooks/useAuth";

function App() {
  useAuth();

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
