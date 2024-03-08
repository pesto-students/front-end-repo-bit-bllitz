const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  selectedTab: {},
};
const sidePanelSlice = createSlice({
  name: "sidepanel",
  initialState,
  reducers: {
    setSelectedTab(state, action) {
      return {
        ...state,
        selectedTab: action.payload,
      };
    },
  },
});
export const { setSelectedTab } = sidePanelSlice.actions;

export default sidePanelSlice.reducer;
