import React from 'react';
import Product from './Product';
import ProductCard from './ProductCard';
import {PurchaseListAction} from './Purchase';
import {CircularProgress, Grid} from '@mui/material';

interface ShoppingProps {
  products: Product[];
  purchaseListDispatch: React.Dispatch<PurchaseListAction>;
  loading: boolean;
}

const Shopping: React.FC<ShoppingProps> =
({products, purchaseListDispatch, loading}) => {
  return (loading) ?
  (<CircularProgress />) :
  (
    <div className="shopping">
      <h1>Shopping</h1>
      <Grid
        container
        spacing={{xs: 2, md: 4}}
      >
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              purchaseListDispatch={purchaseListDispatch}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default Shopping;
