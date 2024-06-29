import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrashCan,
  faPenToSquare,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

const TodoComponent = ({
  todo,
  deleteTodo,
  toggleEditingTodo,
  saveTodo,
  updateTodo,
}) => {
  const [text, setText] = useState(todo.text);
  const [isUpdate, setIsUpdate] = useState(false);
  const { isEditing, check, isLocal } = todo;
  const [isEmptyClick, setIsEmptyClick] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // 阻擋不合理的請求
    if (!text) {
      setIsEmptyClick(true);
      return;
    }
    if (isLocal && !isUpdate) {
      saveTodo(text, false);
      setIsUpdate(true);
    } else if (isLocal && isUpdate) {
      updateTodo(text, false, todo.id);
    } else {
      updateTodo(text, false, todo.id);
    }
  };

  const handleCheck = (e) => {
    e.preventDefault();

    if (!text) {
      setIsEmptyClick(true);
      return;
    }
    if (isLocal && !isUpdate) {
      saveTodo(text, true);
      setIsUpdate(true);
    } else if (isLocal && isUpdate) {
      updateTodo(text, true, todo.id);
    } else {
      updateTodo(text, true, todo.id);
    }
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
            isEmptyClick
              ? "shake"
              : check
              ? "check"
              : !isEditing
              ? "restrict"
              : ""
          }
          value={text}
          onChange={(e) => {
            e.preventDefault();
            setText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSave(e);
            }
          }}
          readOnly={!isEditing}
        />
        <button
          className="todo"
          onClick={(e) => {
            e.preventDefault();
            toggleEditingTodo(todo.id);
            setIsEmptyClick(false);
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button className="todo" onClick={handleSave}>
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
        {check ? (
          <button
            className="todo"
            onClick={(e) => {
              e.preventDefault();
              deleteTodo(todo.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        ) : (
          <button className="todo" onClick={handleCheck}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoComponent;
