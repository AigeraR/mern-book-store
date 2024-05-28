import React from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import UserCart from './UserCart';
import Navigation from './Navigation';
import SmallBanner from './SmallBanner';
import Nav from './Nav';
import Example from './NavListMenu';
import { useEffect, useState } from 'react';
const Header = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName); // Использование строки напрямую без JSON.parse
    }
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="p-2 text-center hidden lg:flex md:flex xl:flex">
        <SmallBanner />
      </div>
      <div className=''>
        <Nav />
      </div>
      <div className="pr-12 pl-9 hidden xl:flex lg:flex md:flex">
        <div className="flex w-full items-center border-b border-gray-300 p-3">
          <div className="flex-none">
            <Logo />
          </div>
          <div className="flex-grow mx-12 xl:mx-24 lg:mx-24">
            <SearchBar />
          </div>
          <div className="flex-none">
            <UserCart cartItemCount={3} userName={userName} />
          </div>
        </div>
      </div>
      <Example userName={userName}/>
      <div className='flex p-2 sm:w-2  xl:hidden lg:hidden md:hidden items-center justify-center text-sm'>
        <SearchBar className='sm:w-8' />
      </div>
      {/* <div className="flex items-center justify-end space-x-4 p-4">
        {userName ? (
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{userName}</span>
          </div>
        ) : (
          <div className="flex space-x-4">
            <button className="text-indigo-500">Войти</button>
            <button className="text-indigo-500">Регистрация</button>
          </div>
        )}
      </div> */}
    </header>
  );
}
export default Header;