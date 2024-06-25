import React, { useState } from "react";
import TodoComponent from "./todo-component";

const HomeComponent = () => {
  const [todos, setTodos] = useState([1]);

  const addTodo = () => {
    setTodos([...todos, todos.length + 1]);
  };
  return (
    <main>
      <section>
        <h1>Todo-List</h1>
        {todos.map((todo, index) => {
          return <TodoComponent key={index} />;
        })}
        <button className="addTodo" onClick={addTodo}>
          +
        </button>
      </section>
    </main>
  );
};

export default HomeComponent;
