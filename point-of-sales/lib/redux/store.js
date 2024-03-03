import userSlice from "../redux/slices/userSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    auth: userSlice,
    // add more reducers if needed
  },
});
