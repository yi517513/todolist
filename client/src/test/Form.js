import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
