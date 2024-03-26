import { store } from "../../../lib/redux/store.js"; // Import your Redux store
import { addToCart } from "../../../lib/redux/slices/cartSlice.js"; // Import your addToCart action

export default async function handler(item) {
  try {
    // Dispatch action to add item to cart
    await store.dispatch(addToCart(item));
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
}
