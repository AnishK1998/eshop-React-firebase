import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear()

  return (
    <div className='bg-blue-950 text-white h-16 flex items-center justify-center w-full'>
       ©{year} All rights reserved By Anish Enterprise
    </div>
    // <div className='bg-blue-950 fixed text-white h-16 flex items-center justify-center w-full bottom-0'>
    // ©{year} All rights reserved By Anish Enterprise
    // </div>
  )
}

export default Footer