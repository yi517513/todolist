import React, { useState } from "react";
import TodoComponent from "./todo-component";
import { v4 as uuidv4 } from "uuid";

const HomeComponent = () => {
  // 確保每個todo列都有一個唯一的ID，即便刪除了中間列，也能保證React
  // 正確的重新渲染和排列其他列
  const [todos, setTodos] = useState([{ id: uuidv4() }]);

  const addTodo = () => {
    setTodos([...todos, { id: uuidv4() }]);
  };

  const deleteTodo = (idToRemove) => {
    // 不等於indexToRemove的todo會被留下來
    setTodos(todos.filter((todo) => todo.id !== idToRemove));
  };

  return (
    <main>
      <section>
        <h1>Todo-List</h1>
        {todos.map((todo, index) => {
          return (
            <TodoComponent
              key={todo.id}
              id={todo.id}
              index={index}
              deleteTodo={deleteTodo}
            />
          );
        })}
        <button className="addTodo" onClick={addTodo}>
          +
        </button>
      </section>
    </main>
  );
};

export default HomeComponent;
