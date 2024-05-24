import React from 'react';
import './Header.css';
import Logo from './Logo';
import SearchBar from './SearchBar';
import UserCart from './UserCart';
import Navigation from './Navigation';
import { MegaMenuDefault } from './NavListMenu'; // Correct import
import SmallBanner from './SmallBanner';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="bg-blue-400 p-2 text-center">
        <SmallBanner />
      </div>
      <div className="grid grid-cols-6 gap-2 items-center px-4 py-3 border-b border-gray-300">
        <div className="col-span-6 md:col-span-1 sm:col-span-3 flex justify-center md:justify-start">
          <Logo />
        </div>
        <div className="col-span-6 md:col-span-3 sm:col-span-4 ">
          <SearchBar />
        </div>
        <div className="col-span-6 md:col-span-2 sm:col-span-3 flex justify-center md:justify-end">
          <UserCart />
        </div>
      </div>
      <div className="border-b border-gray-300">
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
