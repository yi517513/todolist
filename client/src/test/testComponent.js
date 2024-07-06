import React from "react";
import { useSelector } from "react-redux";

const testComponent = ({ itemID }) => {
  return (
    <div>
      <input placeholder={`ID: ${itemID}`} />
    </div>
  );
};

export default testComponent;
