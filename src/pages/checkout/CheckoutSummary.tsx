import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/Slice/cartSlice'

const CheckoutSummary = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div className='px-4 py-4 drop-shadow-lg rounded-md bg-white w-full'>
        <p className='text-xl text-slate-500'>Checkout Summary</p>
        <p className='text-sm text-slate-500 mt-2'>Cart Items(s): {cartTotalQuantity}</p>
        <div className='flex justify-between'>
            <p className='text-lg font-semibold'>Subtotal</p>
            <p className='text-xl text-red-500'>{cartTotalAmount.toFixed(2)}</p>
        </div>
        {
            cartItems?.map((item: any, index: number) => {
                const {id, price, name, cartQuantity} = item;
                return (
                        <div className='mt-3 mb-1 border-2 border-blue-400 w-full px-3 py-1' key={id}>
                            <p className='text-xl font-semibold'>{name}</p>
                            <p className='text-slate-500'>Quantity: {cartQuantity}</p>
                            <p className='text-slate-500'>Unit Price: {price}</p>
                            <p className='text-slate-500'>Set Price: {(price * cartQuantity).toFixed(2)}</p>
                        </div>
                    )
            })
        }
       

    </div>
  )
}

export default CheckoutSummary