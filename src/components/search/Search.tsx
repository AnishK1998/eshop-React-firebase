import React from 'react'
import { searchPropModel } from '../models/models'

const Search = (props: searchPropModel) => {
  return (
    <div className='relative flex items-center'>
        <div className='left-2 absolute'>
            <i className="fa-solid fa-magnifying-glass text-slate-600"></i>
        </div>
        <div>
            <input type="text" placeholder='Search by name' name="search" className="py-1 pl-8 border-slate-400 border-2 rounded-lg" value={props.value} onChange={(e) => props.onChange(e.target.value)}/>
        </div>
    </div>
  )
}

export default Search