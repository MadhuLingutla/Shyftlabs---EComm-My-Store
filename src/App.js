import React from 'react';
import { Route, Routes } from "react-router-dom";
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => (
  <Routes>
    <Route path="/" element={<ProductList />} />
    <Route path="/cart" element={<Cart />} />
  </Routes>
);

export default App;