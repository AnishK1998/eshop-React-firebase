import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import useFetchDocument from "../../../custom hooks/useFetchDocument";
import { Orders } from "../../models/models";
import ChangeOrderStatus from "../change order status/ChangeOrderStatus";

const OrderDetails = () => {
  const [orders, setOrders] = useState<null | Orders>(null);
  const { id } = useParams();
  const { document, isLoading } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrders(document);
  }, [document]);
  return (
    <div className="w-full bg-slate-100" style={{ minHeight: '35.8rem'}}>
      {isLoading && <Loader />}
      <div className="mx-4 py-2">
        <p className="text-2xl font-bold py-2">Order Details</p>
        <Link
          to="/admin/order"
          className="text-base text-slate-500 my-2 inline-block"
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
        <p className="w-1/2">
          <strong>Shipping Address:</strong>{" "}
          <span className="text-slate-500">{orders?.shippingAddress.line1}</span>{" "}
          <span className="text-slate-500">{orders?.shippingAddress.line2}</span>{" "}<br/>
          <span className="text-slate-500">City: - {orders?.shippingAddress.city} ,</span>{" "}<br/>
          <span className="text-slate-500">State:- {orders?.shippingAddress.state} ,</span>{" "}<br/>
          <span className="text-slate-500">Country:- {orders?.shippingAddress.country} :</span>{" "}
          <span className="text-slate-500">{orders?.shippingAddress.postal_code}</span>{" "}
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="md:w-1/3 w-full">
          <ChangeOrderStatus orders={orders} id={id}/>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails