import {configureStore, combineReducers} from "@reduxjs/toolkit"
import authReducer from "./Slice/authSlice"
import productSlice from "./Slice/productSlice";
import filterSlice from "./Slice/filterSlice";
import cartReducer from "./Slice/cartSlice";
import checkoutReducer from "./Slice/checkoutSlice";
import orderReducer from "./Slice/orderSlice";

const combinedReducer = combineReducers({
     auth:authReducer,
     products : productSlice,
     filter : filterSlice,
     cart: cartReducer,
     checkout: checkoutReducer,
     orders: orderReducer
    });

const store = configureStore({
    reducer: combinedReducer
})

export default store;
