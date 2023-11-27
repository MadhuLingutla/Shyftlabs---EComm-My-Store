import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../actions/cartActions';
import '../styles.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const clearAllItems = () => {
    dispatch(clearCart());
  };

  const updateItemQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity(productId, newQuantity));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = isNaN(item.quantity) || item.quantity <= 0 ? 1 : item.quantity;
      return total + item.price * quantity;
    }, 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{item.title}</p>
              <p>
                Quantity:
                <input
                  type="text"
                  value={item?.quantity || ''}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value, 10);
                    updateItemQuantity(item.id, isNaN(newQuantity) ? undefined : newQuantity);
                  }}
                />
              </p>
              <p>Price: ${item.price}</p>
              <p>Total: ${item?.quantity ? item.price * item?.quantity?.toFixed(2) : item.price * 1}</p>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <div className="cart-summary">
            <p>Total: ${calculateTotal()}</p>
            <button onClick={clearAllItems}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
