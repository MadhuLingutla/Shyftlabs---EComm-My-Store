const initialState = {
  items: [],
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity || 1;
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
      case 'UPDATE_QUANTITY':
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.productId
              ? { ...item, quantity: action.payload.newQuantity }
              : item
          ),
        };
    default:
      return state;
  }
};

export default cartReducer;
