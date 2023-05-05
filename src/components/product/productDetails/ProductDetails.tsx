import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Loader from "../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_cart,
  cart_decrement,
  selectCartItems,
} from "../../../redux/Slice/cartSlice";
import useFetchDocument from "../../../custom hooks/useFetchDocument";
import useFectCollection from "../../../custom hooks/useFectCollection";
import { Reviews } from "../../models/models";
import Rating from "@mui/material/Rating";

export interface getProductModel {
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  brand: string;
  category: string;
}

const ProductDetails = () => {
  const [product, setProduct] = useState<any>();
  // const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItems);
  const itemInCart = cartItem.find((item: any) => item.id === id);
  const { document, isLoading } = useFetchDocument("products", id);
  const {data} = useFectCollection("review");
  const filteredReviews: Reviews[] = data?.filter((item: any) => item.productId === id);

  const handleAddToCart = (product: any) => {
    dispatch(add_to_cart(product));
  };

  const handleQuantityIncrement = (product: any) => {
    dispatch(add_to_cart(product));
  };
  const handleQuantityDecrement = (product: any) => {
    dispatch(cart_decrement(product));
  };

  useEffect(() => {
    setProduct(document);
  }, [document]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="mx-8 my-4">
        <p className="text-2xl font-semibold mb-3">Product Details</p>
        <div className="hover:-translate-y-1 duration-300">
          <Link to={"/#products"}>
            &larr; <span className="font-semibold">Back To Products</span>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 py-4 bg-slate-100">
          <div className="mx-2">
            <img
              src={product?.imageUrl}
              alt={product?.name}
              style={{ width: "90%", minHeight: "75%", maxHeight: "75%" }}
            />
          </div>
          <div>
            <p className="text-2xl text-slate-700 font-semibold">
              {product?.name}
            </p>
            <p className="text-lg text-orange-700 font-semibold py-2">
              $ {product?.price}
            </p>
            <p className="text-base text-slate-600 py-2">
              {product?.description}
            </p>
            <p className="py-2 text-base">
              <b>SKU:</b> <span className="text-slate-600">{product?.id}</span>
            </p>
            <p className="py-2 text-base">
              <b>Brand:</b>{" "}
              <span className="text-slate-600">{product?.brand}</span>
            </p>

            {itemInCart && (
              <div className="flex my-2">
                <button
                  className="px-3 py-0.5 bg-slate-600 text-white text-lg mr-2"
                  onClick={() => handleQuantityDecrement(product)}
                >
                  -
                </button>
                <b> {itemInCart.cartQuantity} </b>
                <button
                  className="px-3 py-0.5 bg-slate-600 text-white text-lg ml-2"
                  onClick={() => handleQuantityIncrement(product)}
                >
                  +
                </button>
              </div>
            )}
            <Button
              variant="contained"
              color="warning"
              className="my-3"
              onClick={() => handleAddToCart(product)}
            >
              ADD TO CART
            </Button>
          </div>
        </div>

        <div className="my-3 bg-slate-100 drop-shadow-xl rounded-lg md:w-1/2  px-4 py-3">
          <p className="text-2xl text-slate-700 py-3">Product Reviews</p>
          {
            filteredReviews?.length === 0 && (
              <div>
                 <hr className="border-slate-300  mt-3 mb-2"/>
                 <p className="text-slate-500">There are no reviews for this product</p>
              </div>
             
            )
          }
          {
            filteredReviews?.map((item, index) => {
              return (
                <div key={index} className="border-blue-200 border-y-2">
                   <Rating name="half-rating" defaultValue={0} precision={0.5} size="large"
                          value={item.rate} readOnly className="pb-2" />
                    <p className="text-slate-500 text-sm">{item.review}</p>
                    <p className="font-bold text-slate-800 text-sm py-1">{item.reviewDate}</p>
                    <p className="font-bold text-slate-800 text-sm">By: {item.userName}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
