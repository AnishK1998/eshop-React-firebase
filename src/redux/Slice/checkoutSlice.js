import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shippingAddress: {},
    billingAddress: {}
}

const checkoutSlice = createSlice({
  name: "checkoutSlice",
  initialState,
  reducers: {
    save_billing_address: (state, action) => {
        state.billingAddress = action.payload;
    },
    save_shipping_address: (state, action) => {
        state.shippingAddress = action.payload;
    }
  }
});

export const {save_billing_address, save_shipping_address} = checkoutSlice.actions;

export const selectShippingAddress = (state) => state.checkout.shippingAddress;
export const selectBillingAddress = (state) => state.checkout.billingAddress;

export default checkoutSlice.reducer