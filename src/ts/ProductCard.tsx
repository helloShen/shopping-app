import React, {useState, useEffect} from 'react';
import Product from './Product';
import {PurchaseListAction} from './Purchase';
import {Counter} from './Counter';
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  // CardAction,
  CardActionArea,
} from '@mui/material';

export interface ProductComponentProps {
  product: Product;
  purchaseListDispatch: React.Dispatch<PurchaseListAction>;
}

const ProductCard: React.FC<ProductComponentProps> =
({product, purchaseListDispatch}) => {
  const [count, setCount] = useState(0);
  // counter decrement button disabled
  const [decrementDisabled, setDecrementDisabled] = useState(true);
  // add to cart button disabled
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (count === 0) {
      setDisabled(true);
      setDecrementDisabled(true);
    } else {
      if (disabled) setDisabled(false);
      if (decrementDisabled) setDecrementDisabled(false);
    }
  }, [count]);

  const productAddClasses = 'product__add' +
    ((disabled) ? ' disabled' : '');

  return (
    <Grid item key={product.id} xs={12} md={6} lg={4} xl={3}>
      <Card className="product">
        <div className="product__image">
          <img src={product.image} />
        </div>
        <CardContent className="product__info">
          <div className="product__title">
            {product.title}
          </div>
          <div className="product__description">
            {product.description}
          </div>
        </CardContent>
        <CardContent className="product__purchase">
          <div className="product__price">
            {'$' + product.price}
          </div>
          <div className="product__counter">
            <div className="product__quantity">Quantity:</div>
            <Counter
              count={count}
              setCount={setCount}
              decrementDisabled={decrementDisabled}
              setDecrementDisabled={setDecrementDisabled}
            />
          </div>
        </CardContent>
        <CardActionArea
          className={productAddClasses}
          onClick={() => {
            purchaseListDispatch(
                {type: 'add', data: {product: product, count: count}},
            );
            setCount(0);
          }}
        >
          <div className="product__add-textcontainer">
            <span className="product__add-text">Add to cart</span>
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductCard;
