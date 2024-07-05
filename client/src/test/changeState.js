import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleChangeState } from "./slices/changeStateSlice";

const changeReduxState = () => {
  const dispatch = useDispatch();
  const changeState = useSelector((state) => state.change.changeState);

  return (
    <div>
      <button onClick={() => dispatch(toggleChangeState())}>
        Toggle State
      </button>
      <p>{`Current State: ${changeState}`}</p>
    </div>
  );
};

export default changeReduxState;
