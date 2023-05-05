import {useEffect} from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useDispatch, useSelector } from "react-redux";
import { selectProduct , setProduct} from "../../../redux/Slice/productSlice";
import { calc_total_order_amount, selectOrderHistory, selectTotalOrderAmount, store_order } from "../../../redux/Slice/orderSlice";
import useFectCollection from "../../../custom hooks/useFectCollection";
import Chart from "../../chart/Chart";


const Home = () => {
  const dispatch = useDispatch();
  const totalProducts = useSelector(selectProduct);
  const totalOrders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fbProducts = useFectCollection("products");
  const fbOrders = useFectCollection("orders");

  useEffect(() => {
      dispatch(setProduct(fbProducts.data));
      dispatch(store_order(fbOrders.data));
      dispatch(calc_total_order_amount(null));
  },[dispatch, fbOrders, fbProducts])

  return (
    <div className="md:w-3/4 w-full" style={{ minHeight: "35.8rem" }}>
      <div className="md:px-7 py-1">
        <p className="text-2xl font-semibold text-slate-800 py-3">Admin Home</p>
        <div>
          <div className="flex">
              <div className="bg-slate-200 drop-shadow-lg px-4 py-2 rounded-lg border-b-4 border-b-purple-500 w-1/2 mr-4">
                <p className="text-2xl font-bold text-slate-700">Earnings1</p>
                <div className="flex justify-between">
                  <p className="text-slate-500 font-bold text-lg mt-2">$ {totalOrderAmount}</p>
                  <div>
                    <MonetizationOnIcon fontSize="large" className="text-purple-600"/>
                  </div>
                </div>
              </div>

              <div className="bg-slate-200 px-4 py-2 drop-shadow-lg rounded-lg border-b-4 border-b-blue-500 w-1/2">
                <p className="text-2xl font-bold text-slate-700">Products</p>
                <div className="flex justify-between">
                  <p className="text-slate-500 font-bold text-lg mt-2">{totalProducts?.products?.length}</p>
                  <div>
                    <ShoppingCartCheckoutIcon fontSize="large" className="text-blue-500"/>
                  </div>
                </div>
              </div>
          </div>
            <div className="bg-slate-200 px-4 py-2 drop-shadow-lg rounded-lg border-b-4 border-b-orange-500 w-1/2 mr-4 my-3">
              <p className="text-2xl font-bold text-slate-700">Orders</p>
              <div className="flex justify-between">
                <p className="text-slate-500 font-bold text-lg mt-2">{totalOrders?.length}</p>
                <div>
                  <ShoppingBagIcon fontSize="large" className="text-orange-500"/>
                </div>
              </div>
            </div>
        </div>

        <div>
          <Chart />
        </div>

      </div>
    </div>
  );
};

export default Home;
