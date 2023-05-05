import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { selectUserId, selectUserName } from "../../redux/Slice/authSlice";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import useFetchDocument from "../../custom hooks/useFetchDocument";
import Loader from "../Loader/Loader";

const ReviewProduct = () => {
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState("");
  const { id } = useParams();
  const [products, setProducts] = useState<any>();
  const { document} = useFetchDocument("products", id);

  useEffect(() => {
    setProducts(document);
  }, [document]);

  const userName = useSelector(selectUserName);
  const userId = useSelector(selectUserId);

  const handleFeedback = async (event: any) => {
    event.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userId,
      userName,
      productId: id,
      rate: rating,
      review: review,
      reviewDate: date,
      createdAt: Date.now(),
    };

    try {
      await addDoc(collection(db, "review"), reviewConfig);
      toast.success("Review Submitted Successfully");
      setRating(0);
      setReview("");
    } catch (error) {
      toast.error("Failed to update order in Firebase");
    }
  };
  return (
    <div className="w-full bg-slate-100" style={{ minHeight: "35.8rem" }}>
      {products === undefined ? (
        <Loader />
      ) : (
        <div className="md:mx-24 pt-3">
          <p className="text-3xl font-bold pt-4 pb-2">Rate this Product</p>
          <p>
            <strong>Product Name: </strong>
            <span className="text-slate-500">{products.name}</span>
          </p>
          <img
            src={products.imageUrl}
            alt={products.name}
            style={{ width: "100px" }}
            className="my-2"
          />
          <Rating
            name="half-rating"
            defaultValue={0}
            precision={0.5}
            size="large"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <form onSubmit={handleFeedback}>
            <div>
              <textarea
                value={review}
                required
                onChange={(e) => setReview(e.target.value)}
                cols={49}
                rows={8}
                placeholder="Write your review here"
                className="border-2 border-slate-400 rounded-md my-2 px-2 py-2"
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="small"
                className="my-2"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewProduct;
