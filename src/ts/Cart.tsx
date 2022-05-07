import React from 'react';
import {Product, Purchase} from './models';

interface CartProp {
  cartList: Purchase[];
};

const Cart: React.FC<CartProp> = ({cartList}) => {
  return (
    <div className="cart">
      <h1>Cart</h1>
      {cartList.map((purchase) => {
        return JSON.stringify(purchase);
      })}
    </div>
  );
};

export default Cart;
