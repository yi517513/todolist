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

  // 如果user存在，取得user的_id
  const _id = user ? user._id : null;

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
              key={todo.id}
              todo={todo}
              deleteTodo={() => dispatch(deleteTodo(todo.id))}
              toggleEditingTodo={() => dispatch(toggleEditingTodo(todo.id))}
              saveTodo={(text, check) =>
                dispatch(
                  saveTodo({
                    id: todo.id,
                    text,
                    check,
                    token,
                    userID: _id,
                  })
                )
              }
              updateTodo={(text, check) =>
                dispatch(
                  updateTodo({ id: todo.id, text, check, token, userID: _id })
                )
              }
              checkTodo={(text, check) =>
                dispatch(
                  updateTodo({ id: todo.id, text, check, token, userID: _id })
                )
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
