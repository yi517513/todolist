import React, { useEffect, useState } from "react";
import {
  toggleInputEditing,
  toggleInputRestrict,
  toggleInputComplete,
} from "./slices/tripleButtonSlice";
import { useDispatch, useSelector } from "react-redux";

const tripleBtn = () => {
  const dispatch = useDispatch();
  const { isEditing, isRestrict, isComplete } = useSelector(
    (state) => state.triple
  );
  const [className, setClassName] = useState("");
  useEffect(() => {
    if (isEditing) {
      setClassName("edit");
    }
    if (isRestrict) {
      setClassName("restrict");
    }
    if (isComplete) {
      setClassName("complete");
    }
  }, [isEditing, isRestrict, isComplete]);

  const handleRemove = () => {
    console.log("remove clicked");
  };

  return (
    <div>
      <input className={className} readOnly={isComplete} />
      <button onClick={() => dispatch(toggleInputEditing())}>edit</button>

      {isEditing && (
        <button onClick={() => dispatch(toggleInputRestrict())}>
          restrict
        </button>
      )}
      {isRestrict && (
        <button onClick={() => dispatch(toggleInputComplete())}>
          complete
        </button>
      )}
      {isComplete && <button onClick={handleRemove}>remove</button>}
    </div>
  );
};

export default tripleBtn;
