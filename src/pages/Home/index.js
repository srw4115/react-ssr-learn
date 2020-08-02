import React, { useState, useCallback } from "react";

const Home = () => {
  const [count, setState] = useState(0);

  const updateState = useCallback(() => {
    setState(count + 1);
  });

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={updateState}>add</button>
    </div>
  );
};

export default Home;
