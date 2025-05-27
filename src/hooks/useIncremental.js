import { useState } from "react";

function useIncremental(initial = 0) {
  const [count, setCount] = useState(initial);
  const incremental = () => {
    setCount((v) => v + 1);
  };
  const decremental = () => {
    setCount((v) => v - 1);
  };
  return [count, incremental, decremental];
}

export default useIncremental;
