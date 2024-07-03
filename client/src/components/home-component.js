import React, { useEffect, useState, useCallback } from "react";
import TodoComponent from "./todo-component";
import { useDispatch, useSelector } from "react-redux";
import { newTodo, setTodoItem, clearAllTodos } from "../slices/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFolderOpen,
  faCalendarDays,
  faTrash,
  faArrowLeft,
  faArrowRight,
  faFolderClosed,
} from "@fortawesome/free-solid-svg-icons";
import { setOpen, changeDay, selectDay } from "../slices/configSlice";
import DateService from "../services/date.service";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const { token, user } = useSelector((state) => state.auth);
  const { open, day } = useSelector((state) => state.config);
  // 是否顯示輸入日期欄位
  const [isInputDateVisible, setIsInputDateVisible] = useState(false);

  const getTodosFromLocalStroage = useCallback(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("todo_")) {
        const todoString = localStorage.getItem(key);
        try {
          const todo = JSON.parse(todoString);
          if (todo) {
            // 根據日期決定要set哪些todo
            let witchDay = DateService.daysAgo(day);
            dispatch(setTodoItem({ ...todo, witchDay }));
          } else {
            console.error(`Invalid todo data: ${todoString}`);
          }
        } catch (error) {
          console.error(`Failed to parse todo data: ${todoString}`, error);
        }
      }
    });
  }, [day, dispatch]);

  // get data from localStorage
  useEffect(() => {
    if (!open) {
      dispatch(clearAllTodos());
      getTodosFromLocalStroage();
    } else {
      dispatch(clearAllTodos());
    }
  }, [open, day, dispatch, getTodosFromLocalStroage]);

  const handleDateOutput = () => {
    switch (day) {
      case 0:
        return "Today";
      case -1:
        return "Yesterday";
      default:
        return `${day * -1} days ago`;
    }
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    const targetDate = e.target.value;
    if (targetDate.length === 8) {
      const diffDays = DateService.daysDifference(targetDate);
      dispatch(selectDay(diffDays));
    } else {
      alert("請輸入 YYYYMMDD 的格式");
    }
  };

  const clearLocalTodos = () => {
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
  };

  if (token && !user) {
    return <h1>Loading...</h1>;
  }

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
            {!open ? (
              <button
                className="middle-btn"
                onClick={() => {
                  dispatch(setOpen());
                }}
              >
                <FontAwesomeIcon icon={faFolderOpen} />
              </button>
            ) : (
              <button
                className="middle-btn"
                onClick={() => {
                  dispatch(setOpen());
                }}
              >
                <FontAwesomeIcon icon={faFolderClosed} />
              </button>
            )}
            <button className="middle-btn">
              <FontAwesomeIcon
                icon={faCalendarDays}
                onClick={() => {
                  setIsInputDateVisible((state) => !state);
                }}
              />
            </button>

            <button className="middle-btn" onClick={clearLocalTodos}>
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
          {isInputDateVisible && (
            <div className="dateInput">
              <input
                placeholder="YYYYMMDD"
                onKeyDown={(e) => e.key === "Enter" && handleDateChange(e)}
              />
            </div>
          )}
        </div>
        {Object.values(todos).map((todo) => {
          return <TodoComponent key={todo.todoID} todo={todo} />;
        })}
        <button
          className="addTodo"
          onClick={() => {
            dispatch(newTodo());
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </section>
    </main>
  );
};

export default HomeComponent;
