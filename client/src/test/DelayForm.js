import React from "react";
import { useState, useEffect } from "react";

const DelayForm = ({ onSubmit }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    let timer;
    if (toggleForm) {
      timer = setTimeout(() => {
        setIsFormVisible((state) => !state);
        setToggleForm(false);
      }, 5000);
    }
    return () => clearTimeout(timer); // 清除計時器
  }, [toggleForm]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
  };

  const handleButtonClick = () => {
    setToggleForm(true);
  };

  return (
    <div>
      {isFormVisible && (
        <form onSubmit={handleFormSubmit}>
          <input onChange={handleInputChange} value={input} />
          <button type="submit">Submit</button>
        </form>
      )}
      <button onClick={handleButtonClick}>
        {isFormVisible ? "Hide Form" : "Show Form"}
      </button>
    </div>
  );
};

export default DelayForm;
