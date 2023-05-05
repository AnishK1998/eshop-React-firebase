import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../custom hooks/useFetchDocument";
import Loader from "../../components/Loader/Loader";
import { Orders } from "../../components/models/models";
import { Button } from "@mui/material";

const OrderDetail = () => {
  const [orders, setOrders] = useState<null | Orders>(null);
  const { id } = useParams();
  const { document, isLoading } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrders(document);
  }, [document]);
  return (
    <div className="w-full bg-slate-100" style={{ minHeight: '35.8rem'}}>
      {isLoading && <Loader />}
      <div className="md:mx-24 py-5">
        <p className="text-3xl font-bold pt-4 pb-2">Order Details</p>
        <Link
          to="/order-history"
          className="text-base text-slate-500 my-3 inline-block"
        >
          <p className="hover:-translate-y-1">&larr; Back To Orders</p>{" "}
        </Link>

        <p>
          <strong>Order Id:</strong>{" "}
          <span className="text-slate-500">{orders?.id}</span>{" "}
        </p>
        <p>
          <strong>Order Amount:</strong>{" "}
          <span className="text-slate-500">$ {orders?.orderAmount}</span>{" "}
        </p>
        <p>
          <strong>Order Status:</strong>{" "}
          <span className="text-slate-500">{orders?.orderStatus}</span>{" "}
        </p>

        <div>
          <table className="w-full bg-slate-200 drop-shadow-xl  rounded-lg my-2">
            <thead className="border-y-blue-700 border-2 my-3 py-2">
              <tr>
                <th className="text-left">s/n</th>
                <th className="text-left">Product</th>
                <th className="text-left">Price</th>
                <th className="text-left">Quantity</th>
                <th className="text-left">Total</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody >
              {orders?.orderItems?.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <strong>{index}</strong>
                    </td>
                    <td>
                      <strong>{product.name}</strong>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: "70px" }}
                      />
                    </td>
                    <td>{product.price}</td>
                    <td>{product.cartQuantity}</td>
                    <td>{(parseInt(product.price) * product.cartQuantity).toFixed(2)}</td>
                    <td className="w-1/4">
                      <Link to={`/review-product/${product.id}`}>
                          <Button variant="contained" color="primary" size="small">
                            Review Product
                          </Button>
                      </Link>
                      
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
