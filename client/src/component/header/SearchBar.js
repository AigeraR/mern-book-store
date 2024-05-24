import React from 'react';
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="grid grid-cols-6 gap-2 mx-2 bg-white rounded-md shadow-sm border-gray-300 border-2 ">
      <div className="col-span-1 flex items-center justify-center">
        <FiSearch className="text-lg text-gray-400 " />
      </div>
      <input
        type="text"
        className="col-span-4 w-full py-2 px-2 focus:outline-none rounded-md"
        placeholder="Search for books"
      />
      <button className="col-span-1 bg-main-color text-white px-4 py-2 hover:bg-green-700">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
