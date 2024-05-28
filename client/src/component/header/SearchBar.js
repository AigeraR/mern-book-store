import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { TERipple } from 'tw-elements-react';

const SearchBar = () => {
  return (
    <div className="flex items-center border border-gray-300 bg-white shadow-md rounded-md lg:w-auto">
      <input
        type="search"
        className="relative flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500 px-14 py-2 rounded-l-md border-none"
        placeholder="Поиск книг, авторов..."
        aria-label="Search"
      />
       <FiSearch className="absolute items-center ml-2 text-gray-500 h-6 w-6" /> 
      <TERipple color="light">
        <button
          className="flex items-center justify-center p-2 text-white bg-main-color  shadow-main-color hover:bg-primary-700 focus:outline-none"
          type="button"
        >
          <p className='px-3 font-open-sans'>найти</p>
          {/* <FiSearch className="h-5 w-5" /> */}
        </button>
      </TERipple>
    </div>
  );
};

export default SearchBar;
