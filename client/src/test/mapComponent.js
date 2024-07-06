import React from "react";
import { newItem } from "./slices/mapComponentSlice";
import { useDispatch, useSelector } from "react-redux";
import TestComponent from "./testComponent";

const mapComponent = () => {
  const items = useSelector((state) => state.map.items);
  const dispatch = useDispatch();
  return (
    <div>
      {items &&
        Object.keys(items).map((ID) => <TestComponent key={ID} itemID={ID} />)}
      <button onClick={() => dispatch(newItem())}>newItem</button>
    </div>
  );
};

export default mapComponent;
