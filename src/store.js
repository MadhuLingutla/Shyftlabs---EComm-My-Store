// src/store.js
import { createStore, combineReducers } from 'redux';
import cartReducer from './reducers/cartReducer'; // Assuming you have a cartReducer

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers if you have them
});

const store = createStore(rootReducer);

export default store;
