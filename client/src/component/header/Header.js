import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import UserCart from './UserCart';
import SmallBanner from './SmallBanner';
import Nav from './Nav';
import Example from './NavListMenu';
import { MdAccountCircle } from "react-icons/md";
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Header = () => {
  const [userName, setUserName] = useState('');
  const cartItemCount = 3;

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName); // Using the string directly without JSON.parse
    }
  }, []);

  return (
    <header className="bg-white shadow-md ">
      <div className="p-2 text-center hidden lg:flex md:flex xl:flex">
        <SmallBanner />
      </div>     
        <Nav />   
      <div className="pr-12 pl-9 hidden xl:flex lg:flex md:flex">
        <div className="flex w-full items-center border-b border-gray-300 p-3">
          <div className="flex-none">
            <Logo />
          </div>
          <div className="flex-grow mx-12 xl:mx-24 lg:mx-24 ">
            <SearchBar />
          </div>
          <div className="flex-none">
            <UserCart cartItemCount={3} userName={userName} />
          </div>
        </div>
      </div>

      <div className='relative z-20' >
        <Example userName={userName} cartItemCount={cartItemCount} />
      </div>
      <div className='flex p-2 sm:w-2 xl:hidden lg:hidden md:hidden items-center justify-center text-sm relative z-20'>
        <SearchBar className='sm:w-8' />
      </div>
    </header>
  );
}

export default Header;
