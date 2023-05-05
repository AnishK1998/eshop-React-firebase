import {useEffect} from 'react';
import ProductFilter from './productFilter/ProductFilter';
import ProductList from './productList/ProductList';
import { useDispatch } from 'react-redux';
import { getPriceRange, setProduct} from '../../redux/Slice/productSlice';
import useFectCollection from '../../custom hooks/useFectCollection';
import Loader from '../Loader/Loader';

const Product = () => {
  const { data, isLoading} = useFectCollection("products");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProduct(data));
    dispatch(getPriceRange(data))
  }, [data, dispatch]);

  return (
    <div className='flex w-full'>
      <div className=' w-1/4'>
      {isLoading && <Loader />}
        <ProductFilter />
      </div>
      <div className='w-3/4'>
        {isLoading && <Loader />}
        <ProductList products={data}/>
      </div>
    </div>
  )
}

export default Product