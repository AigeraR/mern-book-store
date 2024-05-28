import React from 'react'
import { Link } from 'react-router-dom'

function SmallBanner() {
  return (
    <div className="w-full hidden lg:flex xl:flex md:flex">
    <Link to='/sale'>
      <div className="w-full">
       <img src='https://ndc.book24.ru/rk/04f/04fd5dbfba3ba11233c0983bbfabcc8a/e46f8c97407522948888340b5d8c9014.jpg' alt='sale' 
       className='w-full '/>
      </div>
    </Link>
  </div>
  )
}

export default SmallBanner