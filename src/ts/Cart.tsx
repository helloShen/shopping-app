import React, {ReactElement} from 'react';
import Product from './Product';
import Purchase, {PurchaseListAction} from './Purchase';
import {CartCounter} from './Counter';
import {Paper} from '@mui/material';

interface CartProp {
  purchaseList: Purchase[];
  purchaseDispatch: React.Dispatch<PurchaseListAction>;
};

const Cart: React.FC<CartProp> = ({purchaseList, purchaseDispatch}) => {
  function handleIncrement(id: number): void {
    const product = purchaseList.find(
        (purchase) => purchase.product.id === id)?.product as Product;
    purchaseDispatch({type: 'add', data: {product: product, count: 1}});
  }

  function handleDecrement(id: number): void {
    const product = purchaseList.find(
        (purchase) => purchase.product.id === id)?.product as Product;
    purchaseDispatch({type: 'remove', data: {product: product, count: 1}});
  }

  return (
    <div className="cart">
      <h1>Cart</h1>
      {purchaseList.map((purchase) => {
        return (
          <CartItem
            key={purchase.product.id}
            purchase={purchase}
            handleIncrement={() => handleIncrement(purchase.product.id)}
            handleDecrement={() => handleDecrement(purchase.product.id)}
          />
        );
      })}
      <Paper
        className="totalPrice"
        elevation={3}
      >
        <span className="totalPrice__title">Total price:  </span>
        <span className="totalPrice__price">
          {'$' + purchaseList.reduce((total, purchase) => {
            return total + purchase.product.price * purchase.count;
          }, 0).toFixed(2)}
        </span>
      </Paper>
    </div>
  );
};

interface CartItemProps {
  purchase: Purchase;
  handleIncrement: React.MouseEventHandler<HTMLButtonElement>;
  handleDecrement: React.MouseEventHandler<HTMLButtonElement>;
}

function CartItem({
  purchase,
  handleIncrement,
  handleDecrement,
}: CartItemProps): ReactElement {
  return (
    <Paper elevation={3} className="cartItem__container">
      <div className="cartItem">
        <div className="cartItem__image">
          <img src={purchase.product.image} />
        </div>
        <div className="cartItem__title">
          {purchase.product.title}
        </div>
        <div className="cartItem__price">
          {'$' + purchase.product.price}
        </div>
        <div className="cartItem__counter">
          <div className="cartItem__quantity">Quantity:</div>
          <CartCounter
            count={purchase.count}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </div>
      </div>
    </Paper>
  );
};

export default Cart;
