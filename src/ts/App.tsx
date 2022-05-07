import React, {ReactElement, useReducer, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Shopping from './Shopping';
import Cart from './Cart';
import {Product, Purchase} from './models';

export type PurchaseListAction =
  {type: string, data: Purchase};

export type PurchaseListReducer =
  (purchaseList: Purchase[], action: PurchaseListAction) => Purchase[];

const purchaseListReducer: PurchaseListReducer = (purchaseList, action) => {
  switch (action.type) {
    case 'add':
      let hasItem = false;
      const result = purchaseList.map((item) => {
        if (item.product.id === action.data.product.id) {
          hasItem = true;
          return {product: item.product, count: item.count + action.data.count};
        }
        return item;
      });
      return (hasItem) ? result : [...purchaseList, action.data];
    default:
      throw new Error();
  }
};

const App: React.FC = () => {
  const [purchaseList, purchaseListDispatch] =
    useReducer(purchaseListReducer, []);

  return (
    <div
      className="app"
    >
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/shopping"
            element={<Shopping purchaseListDispatch={purchaseListDispatch} />}
          />
          <Route path="/cart" element={<Cart cartList={purchaseList} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
