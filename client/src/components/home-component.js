import React, { useState } from "react";
import TodoComponent from "./todo-component";
import { useDispatch, useSelector } from "react-redux";
import {
  newTodo,
  deleteTodo,
  toggleEditingTodo,
  saveTodo,
  updateTodo,
} from "../slices/todoSlice";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const { token, user } = useSelector((state) => state.auth);

  // 如果App.js尚未設置好user就會顯示讀取中，user被設置好才會取值
  if (token && !user) {
    return <h1>Loading...</h1>;
  }

  const handleAddTodo = () => {
    dispatch(newTodo());
  };

  return (
    <main>
      <section>
        <h1>Todo-List</h1>
        {Object.values(todos).map((todo) => {
          return (
            <TodoComponent
              key={todo.todoID}
              todo={todo}
              deleteTodo={() => dispatch(deleteTodo(todo.todoID))}
              toggleEditingTodo={() => dispatch(toggleEditingTodo(todo.todoID))}
              saveTodo={(todoID, text, check) =>
                dispatch(
                  saveTodo({
                    todoID,
                    text,
                    check,
                  })
                )
              }
              updateTodo={(todoID, text, check) =>
                dispatch(updateTodo({ todoID, text, check }))
              }
              checkTodo={(todoID, text, check) =>
                dispatch(updateTodo({ todoID, text, check }))
              }
            />
          );
        })}
        <button className="addTodo" onClick={handleAddTodo}>
          +
        </button>
      </section>
    </main>
  );
};

export default HomeComponent;
