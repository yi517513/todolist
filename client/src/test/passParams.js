import React, { useState } from "react";
import ReciveParamsService from "./reciveParamsService";
import AxiosService from "./axiosService";

const passParams = () => {
  const [params, setParams] = useState("");
  const [name, setName] = useState("");
  return (
    <div>
      <input
        placeholder="Input Text"
        onChange={(e) => {
          setParams(e.target.value);
        }}
      />
      <input
        placeholder="Input Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          ReciveParamsService.getParams(params);
        }}
      >
        Params Submit
      </button>
      <button
        onClick={() => {
          AxiosService.getAllData(name);
        }}
      >
        Name Submit
      </button>
    </div>
  );
};

export default passParams;
