import "./style/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TodoComponent from "./components/todo-component";
import HomeComponent from "./components/home-component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeComponent />} />
          <Route path="/todo" element={<TodoComponent />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
