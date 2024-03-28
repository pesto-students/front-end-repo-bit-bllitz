import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  items: [],
};

// Create a slice for the cart
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

// Export action creators and reducer
export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
