import React from 'react'
import { productItemProp } from '../../models/models'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { add_to_cart } from '../../../redux/Slice/cartSlice'

const ProductItem = (props: productItemProp) => {
  const dispatch = useDispatch()
  const handleAddToCart = () => {
    dispatch(add_to_cart(props.item))
  }
  return (
    <div className='drop-shadow-xl bg-slate-100 rounded-xl py-3' style={{width: '100%', maxHeight: '100%'}}>
      <div>
        <Link to={`/product-details/${props.item.id}`}>
          <img src={props.item.imageUrl} alt={props.item.name} style={{width: '100%', maxHeight: '14.7rem', 
        minHeight: '14.5rem'}} className='rounded-xl'/>
        </Link>
      </div>
      <div className='flex flex-col justify-center'>
          <p className='mt-4 text-center text-lg text-orange-600 font-bold'>{`$ ${props.item.price}`}</p>
          <p className='text-center text-lg text-slate-950 line-clamp-1'>{props.item.name}</p>
          <Button variant='contained' color='warning' fullWidth onClick={handleAddToCart}>Add To Cart</Button>
      </div>
    </div>
  )
}

export default ProductItem