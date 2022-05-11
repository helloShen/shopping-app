import React, {useState} from 'react';
import {Button} from '@mui/material';

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
      <Button
        variant="outlined"
        size="small"
        color="primary"
        className="btn btn-increment"
        onClick={increment}
      >
        +
      </Button>
      <span className="counter__count">{count}</span>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        className={decrementClasses}
        onClick={decrement}
      >
        -
      </Button>
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
      <Button
        size="small"
        variant="outlined"
        className="btn btn-increment"
        onClick={handleIncrement}
      >
      +
      </Button>
      <span className="counter__count">{count}</span>
      <Button
        size="small"
        variant="outlined"
        className="btn btn-decrement"
        onClick={handleDecrement}
      >
        -
      </Button>
    </div>
  );
};

