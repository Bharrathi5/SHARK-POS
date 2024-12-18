import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
  },
  reducers: {
    addOrders: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { addOrders } = orderSlice.actions;

export default orderSlice.reducer;
