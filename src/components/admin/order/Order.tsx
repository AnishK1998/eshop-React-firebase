import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { selectOrderHistory, store_order } from '../../../redux/Slice/orderSlice';
import useFectCollection from '../../../custom hooks/useFectCollection';
import Loader from '../../Loader/Loader';

const Order = () => {
  const {data, isLoading} = useFectCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  useEffect(()=>{
    dispatch(store_order(data))
  },[dispatch, data])

  const handleRowClick = (id: string) =>{
      navigate(`/admin/order-details/${id}`);
  }

  return (
    <div className="w-full bg-slate-100" style={{minHeight: "35.8rem"}}>
      {isLoading && <Loader />}
        <div className="px-3 py-3 ">
        <p className="text-3xl font-bold pt-1 pb-2">All Orders</p>
        <p className="text-base text-slate-500 pb-2">Open an order to <strong className='text-slate-700'>change order status</strong></p>

          <div>
            <table className="w-full bg-slate-200 drop-shadow-xl rounded-lg">
              <thead className="border-y-blue-700 border-2 py-2">
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
                  orders?.map((item: any, index: number) => {
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

export default Order