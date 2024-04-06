import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  items: [],
};

// Create a slice for the cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id && item.category_id === newItem.category_id
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },
    increaseQuantity(state, action) {
      console.log("action increase", action.payload);
      const itemIdToIncrease = action.payload;
      const itemToIncrease = state.items.find(
        (item) => item.id === itemIdToIncrease
      );
      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      console.log("action decrease", action.payload);

      const itemIdToDecrease = action.payload;
      const itemToDecrease = state.items.find(
        (item) => item.id === itemIdToDecrease
      );
      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
      }
    },
    removeItem(state, action) {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== itemIdToRemove);
    },
    clearCart(state) {
      return {
        ...state,
        items: [],
      };
    },
  },
});

// Export action creators and reducer
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
