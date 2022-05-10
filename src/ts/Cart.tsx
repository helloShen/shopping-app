import React, {ReactElement} from 'react';
import Product from './Product';
import Purchase, {PurchaseListAction} from './Purchase';
import {CartCounter} from './Counter';

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
      <div className="totalPrice">
        {purchaseList.reduce((total, purchase) => {
          return total + purchase.product.price * purchase.count;
        }, 0).toFixed(2)}
      </div>
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
    <div className="cartItem">
      <h3 className="cartItem__name">{purchase.product.title}</h3>
      <span className="cartItem__price">{purchase.product.price}</span>
      <CartCounter
        count={purchase.count}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </div>
  );
};

export default Cart;
