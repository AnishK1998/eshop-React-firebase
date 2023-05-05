import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    minPrice: null,
    maxPrice: null
}

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProduct: (state, action) =>{
        state.products = action.payload;
    },
    getPriceRange: (state,action) => {
      const products = action.payload;
      let arr = [];
      products?.map((item) => arr.push(item.price))
      const maxPrice = Math.max(...arr);
      const minPrice = Math.min(...arr);
      state.maxPrice = maxPrice;
      state.minPrice = minPrice;
    }
  }
});

export const {setProduct, getPriceRange} = productSlice.actions;

export const selectProduct = (state) => state.products;
export const selectMinPrice = (state) => state.products.minPrice;
export const selectMaxPrice = (state) => state.products.maxPrice;

export default productSlice.reducer;