import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProduct: []
}

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    filterBySearch: (state, action) => {
       const {products, search} = action.payload;
       const temprory = products?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()))
       state.filteredProduct = temprory
    },
    sortProduct: (state, action) => {
        const {sort, products} = action.payload;
        let tempProducts = [];
        if(sort === "latest"){
            tempProducts = products;
        }else if(sort === "lowest-price"){
            tempProducts = products.slice().sort((a,b) => a.price - b.price);
        }else if(sort === "highest-price"){
            tempProducts = products.slice().sort((a,b) => b.price - a.price);
        }else if(sort === "a-z"){
            tempProducts = products.slice().sort((a,b) => a.name.localeCompare(b.name));
        }else if(sort === "z-a"){
            tempProducts = products.slice().sort((a,b) => b.name.localeCompare(a.name));
        }
        state.filteredProduct = tempProducts
    },
    filterByCategory: (state, action) => {
        const {category, products} = action.payload;
        let temporary= [];
        if(category === "All"){
            temporary = products;
        }else{
            temporary = products.filter((item) => item.category === category);
        }
        state.filteredProduct = temporary;
    },
    filterByBrand: (state, action) => {
        const {brand, products} = action.payload;
        let temporary = [];
        if(brand === "All"){
            temporary = products
        }else{
            temporary = products.filter((item) => item.brand === brand);
        }
        state.filteredProduct = temporary;
    },
    filterByPrice: (state, action) => {
        const {products, price} = action.payload;
        let temporary = [];
        temporary = products?.filter((item) => item.price <= price);
        state.filteredProduct = temporary
    }
  }
});

export const {filterBySearch, sortProduct, filterByCategory, filterByBrand, filterByPrice} = filterSlice.actions;

export const selectFilteredProduct = (state) => state.filter.filteredProduct;

export default filterSlice.reducer