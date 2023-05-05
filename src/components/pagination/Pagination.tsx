import {useState} from 'react'
import { paginationProps } from '../models/models'


const Pagination = (props: paginationProps) => {
  const pageNumber = [];
  const totalPage = Math.ceil(props.totalProducts / props.productsPerPage);
  //limit the page number shown
  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  //paginate
  const paginate = (number: number)=>{
    props.setCurrentPage(number);
  }
  //go to next page
  const paginateNext = ()=>{
    props.setCurrentPage(props.currentPage + 1);
    // setting next sets of pages
    if((props.currentPage + 1) > maxPageNumberLimit){
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  //go to prev page
  const paginatePrev = ()=>{
    props.setCurrentPage(props.currentPage - 1);
    // setting previous sets of pages
    if((props.currentPage - 1) % pageNumberLimit === 0){
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }

  }

  for(let i=1; i<=(Math.ceil(props.totalProducts / props.productsPerPage)); i++){
      pageNumber.push(i);
  }

  return (
    <div className='flex justify-center items-center my-2'>
      <p className={props.currentPage === pageNumber[0] ? ('hidden') : ('cursor-pointer border-2 px-2 py-1 mr-1')} onClick={paginatePrev}>Prev</p>
      {pageNumber.map((item, index) =>{
        if(item < maxPageNumberLimit +1 && item > minPageNumberLimit){
            return (
            <p key={index} onClick={() => paginate(item)} className={props.currentPage === item ? ('cursor-pointer border-2 px-2 py-1 mr-1 bg-orange-600 text-white') : ('cursor-pointer border-2 px-2 py-1 mr-1')}> {item} </p>
          )
        }
      })}
      <p className={props.currentPage === pageNumber[pageNumber.length - 1] ? ('hidden') : ('cursor-pointer border-2 px-2 py-1 mr-1') } onClick={paginateNext}>Next</p>
      <p className='px-2 py-1 mr-1'>
        <b> Pages </b>
        <b>{props.currentPage}</b>
        <span> of </span>
        <b>{totalPage} </b>
      </p>
    </div>
  )
}

export default Pagination