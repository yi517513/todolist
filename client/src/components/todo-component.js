import React, { useState } from "react";

const TodoComponent = ({ id, index, deleteTodo }) => {
  const [todo, setTodo] = useState("");
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [failured, setFailured] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (isEditing) {
        setTodo(input);
        // 按下enter後將資料鎖定。直到點擊edit
        setIsEditing(false);
      }
    }
  };

  const handleAdd = () => {
    setTodo(input);
    setIsEditing(true);
  };

  const handleEdit = () => {
    setIsEditing(false);
  };

  const handleSave = (e) => {
    setTodo(input);
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteTodo(id);
    setIsDelete(true);
  };

  const handleComplete = () => {
    setCompleted(true);
    setFailured(false);
  };

  const handleFailed = () => {
    setFailured(true);
    setCompleted(false);
  };

  return (
    <div className={`todo ${isDelete ? "fade-out" : ""}`}>
      <form onSubmit={handleSubmit}>
        <input
          className={completed ? "completed" : failured ? "failured" : ""}
          placeholder={index}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          readOnly={isEditing}
        />
        {/* 根據是否有todo決定功能 truthy:Edit / falthy:Add */}
        <button
          className="todo"
          onClick={!todo ? handleAdd : isEditing ? handleEdit : handleSave}
        >
          {!todo ? "Add" : isEditing ? "Edit" : "Save"}
        </button>

        <button
          className="todo"
          onClick={completed ? handleFailed : handleComplete}
        >
          O
        </button>

        <button className="todo" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default TodoComponent;
