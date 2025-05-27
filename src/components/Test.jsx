import useIncremental from "../hooks/useIncremental";

function Test() {
  const [count, incremental, decremental] = useIncremental(0);

  return (
    <div>
      <button onClick={decremental}>Decrement</button>
      <p>The count is {count}</p>
      <button onClick={incremental}>Increment</button>
    </div>
  );
}

export default Test;
