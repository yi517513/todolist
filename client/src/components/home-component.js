import React, { useState } from "react";
import TodoComponent from "./todo-component";
import { useDispatch, useSelector } from "react-redux";
import {
  newTodo,
  deleteTodo,
  toggleEditingTodo,
  saveTodo,
  updateTodo,
  setTodo,
} from "../slices/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFolderOpen,
  faCalendarDays,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

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

  const handleFetchData = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("todo_")) {
        const todoString = localStorage.getItem(key);
        try {
          const todo = JSON.parse(todoString);
          if (todo) {
            dispatch(setTodo(todo));
          } else {
            console.error(`Invalid todo data: ${todoString}`);
          }
        } catch (error) {
          console.error(`Failed to parse todo data: ${todoString}`, error);
        }
      }
    });
  };

  return (
    <main>
      <section>
        <div className="top">
          <h1>Todo-List</h1>
          <button className="topbtn" onClick={handleFetchData}>
            <FontAwesomeIcon icon={faFolderOpen} />
          </button>
          {token && (
            <button className="topbtn">
              <FontAwesomeIcon icon={faCalendarDays} />
            </button>
          )}
          <button
            className="topbtn"
            onClick={(e) => {
              e.preventDefault();
              const result = window.confirm("是否刪除本地紀錄?");
              if (result) {
                try {
                  Object.keys(localStorage)
                    .filter((key) => key.startsWith("todo"))
                    .forEach((key) => localStorage.removeItem(key));
                  window.alert("刪除成功");
                } catch (error) {
                  console.error(error);
                }
              }
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
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
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </section>
    </main>
  );
};

export default HomeComponent;
