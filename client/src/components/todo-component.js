import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrashCan,
  faPenToSquare,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

const TodoComponent = ({ todo, deleteTodo, editTodo, saveTodo, checkTodo }) => {
  const [text, setText] = useState(todo.text);
  const { isEditing, check } = todo;

  const handleSave = (e) => {
    e.preventDefault();
    saveTodo(text);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editTodo(todo.id);
    console.log(todo.isEditing);
  };

  return (
    <div className="todo">
      <form>
        <input
          className={!isEditing ? "restrict" : ""}
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
        <button className="todo" onClick={handleEdit}>
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
          <button
            className="todo"
            onClick={(e) => {
              e.preventDefault();
              checkTodo(todo.id);
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoComponent;
