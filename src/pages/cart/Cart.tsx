import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity, add_to_cart, cart_decrement,
  removed_from_cart, clear_cart, calculate_subtotal, calculate_total_Quantity, save_previous_url} from "../../redux/Slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@mui/material'
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { selectIsLoggedIn } from "../../redux/Slice/authSlice";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const url = window.location.href;

  const handleCartDecrement = (item: any)=>{
      dispatch(cart_decrement(item))
  }
  const handleCartIncrement = (item: any) => {
      dispatch(add_to_cart(item));
  }
  const handleClearCart = ()=>{
    dispatch(clear_cart(cartItems));
  }
  const handleRemoveItem = (item: any) =>{
      dispatch(removed_from_cart(item));
  }

  const checkout = ()=> {
      if(isLoggedIn){
        navigate("/checkout-details")
      }else{
        dispatch(save_previous_url(url))
        navigate("/login")
      }
  }

  useEffect(() => {
      dispatch(calculate_subtotal(""));
      dispatch(calculate_total_Quantity(""));
      dispatch(save_previous_url(""));
  },[dispatch, cartItems])

  return (
    <>
      {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <div style={{ height: "34rem" }}>
          <h2 className="text-xl font-bold mx-5 my-7">Your cart is empty</h2>
          <div className="mx-5">
            <Link to={"/#products"}>
              <KeyboardReturnIcon />{" "}
              <span className="font-semibold text-slate-600">
                Continue Shopping
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <div className=" w-full px-5" style={{ minHeight: "34.8rem" }}>
          <h2 className="text-3xl font-bold mt-4 mb-3">Shopping Cart</h2>
          <table className="w-full bg-slate-200 drop-shadow-lg">
            <thead className="border-y-blue-700 border-2 my-3">
              <tr>
                <th className="text-left">s/n</th>
                <th className="text-left">Product</th>
                <th className="text-left">Price</th>
                <th className="text-left">Quantity</th>
                <th className="text-left">Total</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td className="px-2 py-2">
                      <strong>{index}</strong>
                    </td>
                    <td className="px-2 py-2">
                      <strong>{item.name}</strong>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{ width: "80px" }}
                      />
                    </td>
                    <td className="px-2 py-2">{item.price}</td>
                    <td className="px-2 py-2">
                      <div className="flex my-2">
                        <button className="px-2  bg-slate-500 text-white text-lg mr-2" onClick={() => handleCartDecrement(item)}>
                          -
                        </button>
                        <b>{item.cartQuantity}</b>
                        <button className="px-2 bg-slate-500 text-white text-lg ml-2" onClick={() => handleCartIncrement(item)}>
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      {(item.cartQuantity * item.price).toFixed(2)}
                    </td>
                    <td className="px-2 py-2">
                      <i className="fa-solid fa-trash text-red-600 cursor-pointer" onClick={() => handleRemoveItem(item)}></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-between my-5">
            <div>
              <Button variant="contained" color="warning" size="small" onClick={() => handleClearCart()}>Clear Cart</Button>
            </div>
            <div>
              <div>
                <Link to={"/#products"}>
                  <KeyboardReturnIcon />{" "}
                  <span className="font-semibold text-slate-600">
                    Continue Shopping
                  </span>
                </Link>
              </div>
              <div className="my-3 drop-shadow-lg bg-slate-100 px-3 py-2 rounded-lg" style={{width: "18rem"}}>
                <p className="text-sm text-slate-600">Cart Items(s): {cartTotalQuantity}</p>
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">Subtotal</p>
                  <p className="text-lg text-red-500">$ {cartTotalAmount.toFixed(2)}</p>
                </div>
                <p className="text-sm text-slate-600 mt-2 ">Taxes and shipping calculated at checkout</p>
                <Button variant="contained" color="primary" fullWidth size="small" onClick={checkout}>Checkout</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
