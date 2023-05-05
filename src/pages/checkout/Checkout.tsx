import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { selectCartItems, selectCartTotalAmount, calculate_subtotal, calculate_total_Quantity } from "../../redux/Slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail } from "../../redux/Slice/authSlice";
import { selectShippingAddress, selectBillingAddress } from "../../redux/Slice/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkout form/CheckoutForm";
import { StripeElementsOptions , Appearance} from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51LZ7DuSIgkA4vZIRkhizv7rfY1uQcW1uvz9KYDhBO7KFALZEhmYrexmwHfNJXw5i7ynfPcZh1071KBIGowvNQQNj00KZJDSxAB");

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("Initializing Checkout...");
  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);
  const customerEmail = useSelector(selectEmail);

  useEffect(() => {
      dispatch(calculate_subtotal(""));
      dispatch(calculate_total_Quantity(""));
  },[dispatch, cartItems])

  const description = `eShop Payment: ${customerEmail}, Amount: ${cartTotalAmount} `

  useEffect(() => {
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        items: cartItems,
        shippingAddress,
        billingAddress,
        customerEmail,
        description
      }),
    })
      .then((res) => {
        if(res.ok){
          return res.json()
        }
        return res.json().then((json) => Promise.reject(json))
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => {
        setMessage("failed to initialize checkout");
        toast.error("Something went wrong!!!");
    });
  }, []);

  const appearance: Appearance = {
    theme: "stripe"
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      {
        !clientSecret && (
            <p className="text-xl text-slate-500 mx-8 my-5">{message}</p>
        )
      }
       {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Checkout