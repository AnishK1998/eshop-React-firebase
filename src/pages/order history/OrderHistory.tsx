import {useEffect} from 'react'
import useFectCollection from '../../custom hooks/useFectCollection'
import { useDispatch , useSelector} from 'react-redux';
import { store_order, selectOrderHistory } from '../../redux/Slice/orderSlice';
import { selectUserId } from '../../redux/Slice/authSlice';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const {data, isLoading} = useFectCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  useEffect(()=>{
    dispatch(store_order(data))
  },[dispatch, data])

  const handleRowClick = (id: string) =>{
      navigate(`/order-details/${id}`);
  }
  const filterOrders = orders?.filter((order: any) => order.userId === userId)

  return (
    <div className="w-full bg-slate-100">
      {isLoading && <Loader />}
        <div className="mx-10 py-5">
        <p className="text-3xl font-bold pt-4 pb-2">Order History</p>
        <p className="text-base text-slate-500 mb-2">Open an order to leave a <strong className='text-slate-800'>Product Review</strong></p>

          <div>
            <table className="w-full bg-slate-200 drop-shadow-xl rounded-lg">
              <thead className="border-y-blue-700 border-2 my-3 py-2">
                <tr>
                  <th className="text-left">s/n</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Order Id</th>
                  <th className="text-left">Order Amount</th>
                  <th className="text-left">Order Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  filterOrders?.map((item: any, index: number) => {
                      const {orderAmount, id, orderStatus, orderDate} = item;
                      return(
                        <tr key={index} onClick={() => handleRowClick(id)} className='cursor-pointer'>
                            <td className="px-2 py-2">
                              <strong>{index + 1}</strong>
                            </td>
                            <td className="px-2 py-2">
                              <p className='text-slate-700'>{orderDate}</p>
                            </td>
                            <td className="px-2 py-2">
                              <p className='text-slate-700'>{id}</p>
                            </td>
                            <td className="px-2 py-2">
                              <p className='text-slate-700'>$ {orderAmount}</p>
                            </td>
                            <td className="px-2 py-2">
                              <p className={ orderStatus !== "Delivered" ? ('font-semibold text-red-500'):('font-semibold text-green-600')}>{orderStatus}</p>
                            </td>
                        </tr>
                      )
                  })
                }
              </tbody>
            </table>
          </div>

        </div>
    </div>
  )
}

export default OrderHistory