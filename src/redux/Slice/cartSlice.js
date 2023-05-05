import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previousUrl: ""
}

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    add_to_cart: (state, action) =>{
        const productExsist = state.cartItems.findIndex((item) => item.id === action.payload.id);

        if(productExsist >= 0){
          state.cartItems[productExsist].cartQuantity += 1;
          toast.info(`${state.cartItems[productExsist].name} Quantity increased by one`,{position: "top-left"})
        }else{
          const tempPrduct={
            ...action.payload,
            cartQuantity: 1
          }
          state.cartItems.push(tempPrduct)
          toast.success(`${action.payload.name} is added to cart`,{position: "top-left"})
        }
        localStorage.setItem("cartItem", JSON.stringify(state.cartItems))
    },
    cart_decrement: (state, action) =>{
      const productExsist = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if(state.cartItems[productExsist].cartQuantity > 1){
        state.cartItems[productExsist].cartQuantity -= 1;
        toast.warning(`${state.cartItems[productExsist].name} is decreased by one`,{position: "top-left"})
      }else if(state.cartItems[productExsist].cartQuantity === 1){
        const newProduct = state.cartItems.filter((item) => item.id !== action.payload.id)
        state.cartItems = newProduct;
        toast.error(`${action.payload.name} is removed from the cart`,{position: "top-left"})
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems))
    },
    removed_from_cart: (state, action) => {
      const newProducts = state.cartItems.filter((item) => item.id !== action.payload.id);
      state.cartItems = newProducts;
      toast.error(`${action.payload.name} is removed from cart`,{position: "top-left"});
      localStorage.setItem("cartItem", JSON.stringify(newProducts));
    },
    clear_cart: (state, action)=>{
      state.cartItems = [];
      toast.error("Cart is cleared",{position: "top-left"});
      localStorage.setItem("cartItem",JSON.stringify(state.cartItems))
    },
    calculate_subtotal: (state, action) =>{
      const arr = [];
      state.cartItems.map((item) => {
        return arr.push((item.cartQuantity * item.price))
      });
      const subtotal = arr.reduce((a, b) => {return a+b},0);
      state.cartTotalAmount = subtotal
    },
    calculate_total_Quantity: (state, action) => {
      const arr = [];
      state.cartItems.map((item) => arr.push(item.cartQuantity))
      const totalQuantity = arr.reduce((a,b) => {
        return a + b
      },0);
      state.cartTotalQuantity = totalQuantity;
    },
    save_previous_url: (state, action) => {
      state.previousUrl = action.payload;
    }
  },
  
});

export const {add_to_cart, cart_decrement, removed_from_cart, clear_cart, calculate_subtotal, calculate_total_Quantity, save_previous_url} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousUrl = (state) => state.cart.previousUrl

export default cartSlice.reducer