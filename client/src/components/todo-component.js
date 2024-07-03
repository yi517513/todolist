import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMinus,
  faPenToSquare,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import {
  saveTodo,
  updateTodo,
  removeTodo,
  toggleEditingTodo,
} from "../slices/todoSlice";
import { useDispatch } from "react-redux";

const TodoComponent = ({ todo }) => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [isEmptyInput, setIsEmptyInput] = useState(false);
  const { todoID, isEditing, check } = todo;
  const [text, setText] = useState(todo.text);
  // console.log(todoID);

  const handleSaveClick = (e) => {
    e.preventDefault();
    // 阻擋不合理的請求
    if (!text) {
      setIsEmptyInput(true);
      return;
    }
    if (!isSaving) {
      dispatch(saveTodo({ todoID, text, check: false }));
      setIsSaving(true);
    } else {
      dispatch(updateTodo({ todoID, text, check: false }));
    }
  };

  const handleCheckClick = (e) => {
    e.preventDefault();
    if (!text) {
      setIsEmptyInput(true);
      return;
    }
    dispatch(updateTodo({ todoID, text, check: true }));
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    if (!check) {
      dispatch(toggleEditingTodo(todoID));
      setIsEmptyInput(false);
    }
  };

  const handleRemoveClick = (e) => {
    console.log("remove" + todoID);
    e.preventDefault();
    dispatch(removeTodo(todoID));
  };

  return (
    <div className="todo">
      <form>
        {/* className is 
        !text && isEmptyClick = shake 
        input&check = green, 
        input&!isEditing = blue  */}
        <input
          className={
            isEmptyInput
              ? "shake"
              : check
              ? "check"
              : !isEditing
              ? "restrict"
              : ""
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSaveClick(e);
            }
          }}
        />
        <button className="todo" onClick={handleEditClick}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        {isEditing ? (
          <button className="todo" onClick={handleSaveClick}>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        ) : check ? (
          <button className="todo" onClick={handleRemoveClick}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        ) : (
          <button className="todo" onClick={handleCheckClick}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoComponent;
