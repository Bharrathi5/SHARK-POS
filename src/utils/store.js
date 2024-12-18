import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import orderReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    table: productReducer,
    orders: orderReducer,
  },
});

export default store;
