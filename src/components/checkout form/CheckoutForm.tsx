import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutSummary from "../../pages/checkout/CheckoutSummary";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import {Button} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { addDoc, collection  } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserId } from "../../redux/Slice/authSlice";
import { clear_cart, selectCartItems, selectCartTotalAmount } from "../../redux/Slice/cartSlice";
import { selectShippingAddress } from "../../redux/Slice/checkoutSlice";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const userId = useSelector(selectUserId);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);
  
  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
  }, [stripe]);
  const today = new Date();
  const date = today.toDateString();
  const time = today.toLocaleTimeString()
  const order = {
    userId,
    userEmail,
    orderDate: date,
    orderTime: time,
    orderAmount: cartTotalAmount,
    orderStatus: "Order Placed",
    orderItems: cartItems,
    shippingAddress,
    createdAt: Date.now()
  }

  const saveOrder = async ()=> {
    try {
      await addDoc(collection(db, "orders"), order);
      dispatch(clear_cart(""));
      toast.success("Order Placed");
      navigate("/checkout-success");
    } catch (error) {
      toast.error("Failed to update order in Firebase");
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage(undefined);
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout-success",
      },
      redirect: "if_required",
    }).then((result) => {
        if(result.error){
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if(result.paymentIntent){
          if(result.paymentIntent.status === "succeeded"){
            toast.success("Payment Successfull");
            setIsLoading(false);
            saveOrder();
          }
        }
    });
    setIsLoading(false)
  };

  const paymentElementOptions: any = {
    layout: "tabs",
  };

  return (
    <div className="w-full bg-slate-100" style={{ minHeight: "35.8rem"}}>
      <div className="mx-16 py-10 ">
        <div className="md:flex md:flex-row">
            <div className="w-full md:w-1/2 md:mr-5 mb-4">
                <CheckoutSummary />
            </div>
            <div className="w-full md:w-1/2 mt-2">
              <div className="px-4 py-4 drop-shadow-lg rounded-md bg-white w-full">
                <form onSubmit={handleSubmit}>
                    <p className="text-xl text-slate-500">Stripe Checkout</p>
          
                  <PaymentElement id="payment-element" options={paymentElementOptions} />
                  <div className="my-3">
                      <Button disabled={isLoading || !stripe || !elements} type="submit" fullWidth variant="contained" color="primary">
                        <span id="button-text">
                          {isLoading ? <Loader /> : "Pay now"}
                        </span>
                      </Button>
                  </div>
                </form>
                  {message && <div id="payment-message">{message}</div>}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
