import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "table",
  initialState: {
    products: [],
    brands: [],
    categories: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.brands = [
        ...new Set(action.payload.map((product) => product.brand)),
      ];
      state.categories = [
        ...new Set(action.payload.map((product) => product.category)),
      ];
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
