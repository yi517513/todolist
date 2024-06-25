import React from "react";

const TodoComponent = () => {
  return (
    <div className="todo">
      <form>
        <input placeholder="Enter your todo" />
        <button className="todo">Edit</button>
        <button className="todo">Complete</button>
        <button className="todo">Delete</button>
      </form>
    </div>
  );
};

export default TodoComponent;
