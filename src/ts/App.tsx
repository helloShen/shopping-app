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
      const result = purchaseList.map((purchase) => {
        if (purchase.product.id === action.data.product.id) {
          hasItem = true;
          return {
            product: purchase.product,
            count: purchase.count + action.data.count,
          };
        }
        return purchase;
      });
      return (hasItem) ? result : [...purchaseList, action.data];
    case 'remove':
      return purchaseList.map((purchase) => {
        if (purchase.product.id === action.data.product.id) {
          return {
            product: purchase.product,
            count: purchase.count - action.data.count,
          };
        }
        return purchase;
      }).filter((purchase) => purchase.count > 0);
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
          <Route path="/cart" element={
            <Cart
              purchaseList={purchaseList}
              purchaseDispatch={purchaseListDispatch} />
          } />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
