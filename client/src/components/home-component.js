import React, { useState } from "react";
import TodoComponent from "./todo-component";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  editTodo,
  saveTodo,
  checkTodo,
} from "../slices/todoSlice";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const { token } = useSelector((state) => state.auth);
  const { _id } = useSelector((state) => state.auth);

  const handleAddTodo = () => {
    dispatch(addTodo());
  };

  return (
    <main>
      <section>
        <h1>Todo-List</h1>
        {Object.values(todos).map((todo) => {
          return (
            <TodoComponent
              key={todo.id}
              todo={todo}
              deleteTodo={() => dispatch(deleteTodo(todo.id))}
              editTodo={() => dispatch(editTodo(todo.id))}
              saveTodo={(text) =>
                dispatch(
                  saveTodo({
                    id: todo.id,
                    text,
                    check: todo.check,
                    token,
                    userID: _id,
                  })
                )
              }
              checkTodo={() => dispatch(checkTodo(todo.id))}
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
