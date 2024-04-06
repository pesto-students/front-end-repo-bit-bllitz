const { combineReducers } = require("redux");
const { default: userSlice } = require("./userSlice");
const { default: sidePanelSlice } = require("./sidePanelSlice");
const { default: cartSlice } = require("./cartSlice");

const rootReducer = combineReducers({
  auth: userSlice,
  sidePanel: sidePanelSlice,
  cart: cartSlice,
});

export default rootReducer;
