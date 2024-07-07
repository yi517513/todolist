import React, { useState, useCallback, useEffect } from "react";

const hooks = ({ fetchData }) => {
  const [data, setData] = useState(null);

  const fetchDataCallback = useCallback(async () => {
    const result = await fetchData();
    setData(result);
  }, [fetchData]);

  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);

  return <div>{data ? <div>{data}</div> : <div>Loading...</div>}</div>;
};

export default hooks;
