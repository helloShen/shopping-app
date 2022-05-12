import React, {useReducer, useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Shopping from './Shopping';
import Cart from './Cart';
import Product from './Product';
import {purchaseListReducer} from './Purchase';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Footer from '../js/footer/footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

/**
 * Cached data comes from fakestoreapi.
 */
const fetchProducts = async (): Promise<Product[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json();
};

const App: React.FC = () => {
  const [purchaseList, purchaseListDispatch] =
    useReducer(purchaseListReducer, []);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function getProducts() {
    const fetchedProducts = await fetchProducts();
    setProducts(fetchedProducts);
  }

  useEffect(() => {
    if (products.length === 0) {
      setLoading(true);
      getProducts();
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) setLoading(false);
  }, [products]);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="app"
      >
        <Router>
          <Nav purchaseList={purchaseList} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/shopping"
              element={
                <Shopping
                  products={products}
                  purchaseListDispatch={purchaseListDispatch}
                  loading={loading}
                />}
            />
            <Route path="/cart" element={
              <Cart
                purchaseList={purchaseList}
                purchaseDispatch={purchaseListDispatch} />
            } />
          </Routes>
          <Footer
            sourceCode="https://github.com/helloShen/#"
            githubLogo="black"
          />
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
