import { configureStore } from "@reduxjs/toolkit";
import battleReducer from "./battleSlice";
const store = configureStore({
  reducer: {
    battle: battleReducer,
  },
});

export default store;
