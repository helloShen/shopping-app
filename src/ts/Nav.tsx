import React from 'react';
import {Link} from 'react-router-dom';
import Purchase from './Purchase';

export interface NavProps {
  purchaseList: Purchase[];
}

const Nav: React.FC<NavProps> = ({purchaseList}) => {
  return (
    <nav className="nav">
      <div className="nav__logo">ShoppingApp</div>
      <ul className="btns">
        <Link to="/home">
          <li className="btn nav__home">Home</li>
        </Link>
        <Link to="/shopping">
          <li className="btn nav__shopping">
            Shopping
          </li>
        </Link>
      </ul>
      <Link to="/cart">
        <div className="nav__cart">
          <i className="cart__icon material-icons">shopping_cart</i>
          {(purchaseList.length > 0) ?
              <span className="cart__count">
                {purchaseList.reduce((count, purchase) =>
                  count + purchase.count, 0)}
              </span> : null}
        </div>
      </Link>
    </nav>
  );
};

export default Nav;
