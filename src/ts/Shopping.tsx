import React, {useState} from 'react';
import {Product, Purchase} from './models';
import Counter from './Counter';
import {PurchaseListAction} from './App';

const products: Product[] = [
  {id: 1, name: 'cloth', price: 100},
  {id: 2, name: 'pants', price: 80},
];

interface ShoppingProps {
  purchaseListDispatch: React.Dispatch<PurchaseListAction>;
}

const Shopping: React.FC<ShoppingProps> = ({purchaseListDispatch}) => {
  return (
    <div className="shopping">
      <h1>Shopping</h1>
      <ul>
        {products.map((product) => {
          return (
            <ProductComponent
              key={product.id}
              product={product}
              purchaseListDispatch={purchaseListDispatch}
            />
          );
        })}
      </ul>
    </div>
  );
};

interface ProductComponentProps {
  product: Product;
  purchaseListDispatch: React.Dispatch<PurchaseListAction>;
}

const ProductComponent: React.FC<ProductComponentProps> =
({product, purchaseListDispatch}) => {
  const [count, setCount] = useState(0);

  return (
    <li>
      <div className="product">
        <h3 className="product__name">{product.name}</h3>
        <span className="product__price">{product.price}</span>
        <Counter count={count} setCount={setCount} />
        <button
          className="item__add"
          onClick={() => {
            purchaseListDispatch(
                {type: 'add', data: {product: product, count: count}},
            );
            setCount(0);
          }}
        >Add to cart</button>
      </div>
    </li>
  );
};

export default Shopping;
