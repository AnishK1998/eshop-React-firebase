import React from 'react'
import Navbar from '../../components/admin/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../../components/admin/home/Home'
import AddProducts from '../../components/admin/addProducts/AddProducts'
import ViewProducts from '../../components/admin/viewProducts/ViewProducts'
import Order from '../../components/admin/order/Order'
import OrderDetails from '../../components/admin/order details/OrderDetails'

const Admin = () => {
  return (
    <div className='w-full flex'>
      <div className='w-1/4 border-r-2 border-slate-200'>
        <Navbar />
      </div>
      <div className='w-3/4'>
        <Routes >
          <Route path='/home' element={<Home />} />
          <Route path='/add-product/:id' element={<AddProducts />} />
          <Route path='/all-products' element={<ViewProducts />} />
          <Route path='/order' element={<Order />} />
          <Route path='/order-details/:id' element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin