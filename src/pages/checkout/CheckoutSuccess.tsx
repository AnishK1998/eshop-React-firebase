import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from "@mui/material"

const CheckoutSuccess = () => {
  return (
    <div className='mx-20 my-8' style={{minHeight: '31.8rem'}}>
       <p className='text-3xl font-bold mb-3'>Checkout Successfull</p>
        <p className="text-slate-500 mb-2">Thank you for your purchase</p>
        <Link to={"/order-history"}>
            <Button variant='contained' color='primary' size='small'>View Order Status</Button>
        </Link>
    </div>
  )
}

export default CheckoutSuccess