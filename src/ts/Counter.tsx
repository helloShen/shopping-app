import React, {useState} from 'react';

interface CounterProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  decrementDisabled: boolean;
  setDecrementDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Counter: React.FC<CounterProps> =
({count, setCount, decrementDisabled, setDecrementDisabled}) => {
  function increment(): void {
    setCount(count + 1);
  }

  function decrement(): void {
    setCount(count - 1);
  }

  const decrementClasses = 'btn btn-decrement' +
    ((decrementDisabled)? ' disabled' : '');
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
        className={decrementClasses}
        type="button"
        onClick={decrement}
      >
        -
      </button>
    </div>
  );
};

interface CartCounterProps {
  count: number;
  handleIncrement: React.MouseEventHandler<HTMLButtonElement>;
  handleDecrement: React.MouseEventHandler<HTMLButtonElement>;
}

export const CartCounter: React.FC<CartCounterProps> =
({count, handleIncrement, handleDecrement}) => {
  return (
    <div className="counter">
      <button
        className="btn btn-increment"
        type="button"
        onClick={handleIncrement}
      >
        +
      </button>
      <span className="counter__count">{count}</span>
      <button
        className="btn btn-decrement"
        type="button"
        onClick={handleDecrement}
      >
        -
      </button>
    </div>
  );
};

