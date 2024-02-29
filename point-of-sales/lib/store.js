import userSlice from "./user/userSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    user: userSlice,
    // add more reducers if needed
  },
});

export default store;
