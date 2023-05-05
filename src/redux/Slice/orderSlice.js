import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderHistory: [],
    totalOrderAmount: 0
}

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    store_order: (state, action) => {
        state.orderHistory = action.payload;
    },
    calc_total_order_amount: (state, action) =>{
      const arr = [];
      state.orderHistory?.map((item) => {
        const {orderAmount} = item
        return arr.push(orderAmount)
      });
      const totalAmount = arr.reduce((a, b) => {return a+b},0);
      state.totalOrderAmount = totalAmount
    }
  }
});


export const {store_order, calc_total_order_amount} = orderSlice.actions;
export const selectOrderHistory = (state) => state.orders.orderHistory;
export const selectTotalOrderAmount = (state) => state.orders.totalOrderAmount;

export default orderSlice.reducer