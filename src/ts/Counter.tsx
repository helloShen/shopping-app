import React from 'react';

interface CounterProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Counter: React.FC<CounterProps> = ({count, setCount}) => {
  function increment(): void {
    setCount(count + 1);
  }

  function decrement(): void {
    setCount(count - 1);
  }

  return (
    <div className="counter">
      <button
        className="btn btn-increment"
        type="button"
        onClick={increment}
      >
        +
      </button>
      <span className="counter__count">{count}</span>
      <button
        className="btn btn-decrement"
        type="button"
        onClick={decrement}
      >
        -
      </button>
    </div>
  );
};

export default Counter;
