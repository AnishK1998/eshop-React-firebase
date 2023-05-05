import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactUs, Home, Login, Register, Reset, Admin, Cart, OrderHistory } from "./pages";
import { Footer, Header } from "./components";
import "./App.css"
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from "./components/adminOnlyRouts/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderDetail from "./pages/order history/OrderDetail";
import ReviewProduct from "./components/review Products/ReviewProduct";
import NotFound from "./pages/not found/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route path="/admin/*" element={<AdminOnlyRoute><Admin /></AdminOnlyRoute>} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetail />} />
          <Route path="/review-product/:id" element={<ReviewProduct />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
