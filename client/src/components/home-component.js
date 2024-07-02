import React, { useEffect, useState } from "react";
import TodoComponent from "./todo-component";
import { useDispatch, useSelector } from "react-redux";
import {
  newTodo,
  deleteTodo,
  toggleEditingTodo,
  saveTodo,
  updateTodo,
  setTodo,
  clearTodos,
} from "../slices/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFolderOpen,
  faCalendarDays,
  faTrash,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { setOpen, changeDay } from "../slices/configSlice";
import DateService from "../services/date.service";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const { token, user } = useSelector((state) => state.auth);
  const { open, day } = useSelector((state) => state.config);
  const [targetDate, setTargetDate] = useState(null);
  const [inputDate, setInputDate] = useState(false);
  // Fetch data from localStorage
  useEffect(() => {
    if (!open) {
      dispatch(clearTodos());
      const handleFetchData = () => {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("todo_")) {
            const todoString = localStorage.getItem(key);
            try {
              const todo = JSON.parse(todoString);
              if (todo) {
                // 根據日期決定要set哪些todo
                let witchDay = DateService.daysAgo(day);
                dispatch(setTodo({ ...todo, witchDay }));
              } else {
                console.error(`Invalid todo data: ${todoString}`);
              }
            } catch (error) {
              console.error(`Failed to parse todo data: ${todoString}`, error);
            }
          }
        });
      };
      handleFetchData();
    } else {
      dispatch(clearTodos());
    }
  }, [open, day, dispatch]);

  // 如果App.js尚未設置好user就會顯示讀取中，user被設置好才會取值
  if (token && !user) {
    return <h1>Loading...</h1>;
  }

  const handleAddTodo = () => {
    dispatch(newTodo());
  };

  const handleDateOutput = () => {
    switch (day) {
      case 0:
        return "Today";
        break;
      case -1:
        return "Yesterday";
      default:
        return `${day * -1} days ago`;
        break;
    }
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    const targetDate = e.target.value;
    if (targetDate.length === 8) {
      const diffDays = DateService.daysDifference(targetDate);
      dispatch(changeDay(diffDays));
      setInputDate(false);
    } else {
      alert("請輸入 YYYYMMDD 的格式");
    }
  };

  return (
    <main>
      <section>
        <div className="top">
          <h1>{handleDateOutput()}</h1>
          <div className="btnList">
            <button
              className="middle-btn"
              onClick={() => {
                dispatch(changeDay(-1));
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className="middle-btn"
              onClick={() => {
                dispatch(setOpen());
              }}
            >
              <FontAwesomeIcon icon={faFolderOpen} />
            </button>
            {token && (
              <button className="middle-btn">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  onClick={() => {
                    setInputDate((state) => !state);
                  }}
                />
              </button>
            )}
            <button
              className="middle-btn"
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
            {day < 0 && (
              <button
                className="middle-btn"
                onClick={() => {
                  dispatch(changeDay(1));
                }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            )}
          </div>
          {inputDate && (
            <div className="dateInput">
              <input
                placeholder="YYYYMMDD"
                onChange={(e) => {
                  setTargetDate(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleDateChange(e);
                  }
                }}
              />
            </div>
          )}
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
