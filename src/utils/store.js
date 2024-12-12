import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";

const store = configureStore({
  reducer: {
    table: productReducer,
  },
});

export default store;
