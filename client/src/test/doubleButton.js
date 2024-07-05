import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCloseClass, setOpenClass } from "./slices/doubleButtonSlice";
import { useSelector } from "react-redux";

const DoubleButton = () => {
  const dispatch = useDispatch();
  const { isOpenClass, isCloseClass } = useSelector((state) => state.double);
  const [className, setClassName] = useState("open");

  useEffect(() => {
    if (isOpenClass) {
      setClassName("open");
    }
    if (isCloseClass) {
      setClassName("close");
    }
  }, [isOpenClass, isCloseClass]);

  return (
    <div>
      <input className={className} />
      {isCloseClass && (
        <button onClick={() => dispatch(setOpenClass())}>open</button>
      )}
      {isOpenClass && (
        <button onClick={() => dispatch(setCloseClass())}>close</button>
      )}{" "}
    </div>
  );
};

export default DoubleButton;
