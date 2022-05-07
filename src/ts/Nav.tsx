import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <ul className="btns">
        <li className="btn__container">
          <Link to="/home">
            <div
              className="btn"
            >Home</div>
          </Link>
        </li>
        <li className="btn__container">
          <Link to="/shopping">
            <div
              className="btn"
            >Shopping</div>
          </Link>
        </li>
        <li className="btn__container">
          <Link to="/cart">
            <div
              className="btn"
            >Cart</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
