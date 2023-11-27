import React from 'react';
const Product = ({ product, addToCart, handleAddToCart }) => {
  return (
    <div className="product">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)} >Add to Cart</button>
    </div>
  );
};

export default Product;
