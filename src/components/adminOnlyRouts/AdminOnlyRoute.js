import React from 'react'
import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/Slice/authSlice';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminOnlyRoute = ({children}) => {
  const email = useSelector(selectEmail);
  if(email === "anishsingh.199804@gmail.com"){
    return children;
  }else{
    return (
      <div style={{height: '82vh'}}>
        <div className='mx-16 my-7'>
          <p className='text-3xl font-bold my-3'>Permission Denied</p>
          <p className='text-slate-500 my-2'>This Page can only be viewed by Admin user.</p>
          <Link to="/">
              <Button variant='contained' color='info'>&larr; Back To Home</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export const AdminOnlyLink = ({children}) => {
  const email = useSelector(selectEmail);
  if(email === "anishsingh.199804@gmail.com"){
    return children;
  }else{
    return null;
  }
}

export default AdminOnlyRoute