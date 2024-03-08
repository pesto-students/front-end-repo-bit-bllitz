import userSlice from "../redux/slices/userSlice";
import sidePanelSlice from "./slices/sidePanelSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    auth: userSlice,
    sidePanel:sidePanelSlice
    // add more reducers if needed
  },
});
