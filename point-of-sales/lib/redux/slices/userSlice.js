import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
