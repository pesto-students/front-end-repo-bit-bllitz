import userSlice from "../redux/slices/userSlice";
import cartSlice from "./slices/cartSlice";
import sidePanelSlice from "./slices/sidePanelSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    auth: userSlice,
    sidePanel:sidePanelSlice,
    cart: cartSlice
    // add more reducers if needed
  },
});
