import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from "@mui/material"

const NotFound = () => {
  return (
    <div className='flex justify-center items-center text-center' style={{minHeight: '35.8rem'}}>
        <div>
            <p className='text-6xl text-slate-700 font-extrabold'>404</p>
            <p className='text-slate-500'>Ooops Page Not Found ...</p>
            <div className='mt-4'>
                <Link to={"/"}>
                    <Button variant='contained' color='primary' size='small'>&larr; Back To Home</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default NotFound