import React, { useState, useEffect } from "react";

const DelayedButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return <div>{showButton && <button>Click Me</button>}</div>;
};

export default DelayedButton;
