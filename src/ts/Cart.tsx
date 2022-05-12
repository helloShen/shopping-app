import React, {ReactElement} from 'react';
import Product from './Product';
import Purchase, {PurchaseListAction} from './Purchase';
import {CartCounter} from './Counter';
import {Paper, Button} from '@mui/material';

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

  function handleClear(): void {
    purchaseDispatch({type: 'removeAll', data: null});
  }

  return (
    <div className="cart">
      {/* {(purchaseList.length === 0) ?
        (<div className="cart__empty"><span>Empty cart</span></div>) : null} */}
      <Paper className="cartPaper" elevation={3}>
        {(purchaseList.length > 0) ?
          (
            <div className="cart__header">
              <div></div>
              <div className="cart__header-product">
                Product
              </div>
              <div className="cart__header-price">
                Price
              </div>
              <div className="cart__header-quantity">
                Quantity
              </div>
              <div></div>
            </div>
          ) : (<div className="cart__empty">
            <span>Your cart is empty.</span></div>)
        }
        {purchaseList.map((purchase) => {
          return (
            <CartItem
              key={purchase.product.id}
              purchase={purchase}
              handleIncrement={() => handleIncrement(purchase.product.id)}
              handleDecrement={() => handleDecrement(purchase.product.id)}
              purchaseDispatch={purchaseDispatch}
            />
          );
        })}
        {(purchaseList.length > 0) ?
          (
            <div className="totalPrice">
              <Button
                className="btn totalPrice__clear"
                variant="text"
                onClick={handleClear}
              >Clear Cart</Button>
              <div className="totalPrice__priceTag">
                <span className="totalPrice__title">Total price:</span>
                <span className="totalPrice__price">
                  {'$' + purchaseList.reduce((total, purchase) => {
                    return total + purchase.product.price * purchase.count;
                  }, 0).toFixed(2)}
                </span>
              </div>
            </div>
          ) : null
        }
      </Paper>
    </div>
  );
};

interface CartItemProps {
  purchase: Purchase;
  handleIncrement: React.MouseEventHandler<HTMLButtonElement>;
  handleDecrement: React.MouseEventHandler<HTMLButtonElement>;
  purchaseDispatch: React.Dispatch<PurchaseListAction>;
}

function CartItem({
  purchase,
  handleIncrement,
  handleDecrement,
  purchaseDispatch,
}: CartItemProps): ReactElement {
  function handleRemoveItem(id: number): void {
    purchaseDispatch({type: 'removeItem', data: id});
  }

  return (
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
        <CartCounter
          count={purchase.count}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      </div>
      <div
        className="cartItem__remove material-icons"
        onClick={() => handleRemoveItem(purchase.product.id)}
      >close</div>
    </div>
  );
};

export default Cart;
