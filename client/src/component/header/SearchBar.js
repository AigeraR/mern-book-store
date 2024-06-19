import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { TERipple } from 'tw-elements-react';
import axios from 'axios';
import BookCard from '../catalog/BookCard';
import { Link } from 'react-router-dom';

const SearchBar = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/searchByName/${searchTerm}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchTerm.trim() !== '') {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={searchResultsRef}>
      <div className="flex items-center border border-gray-300 bg-white shadow-md rounded-md lg:w-auto">
        <input
          type="search"
          className="relative flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500 px-14 py-2 rounded-l-md border-none"
          placeholder="Поиск книг, авторов..."
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="absolute items-center ml-2 text-gray-500 h-6 w-6" />
        <TERipple color="light">
          <button
            className="flex items-center justify-center p-2 text-white bg-main-color shadow-main-color hover:bg-primary-700 focus:outline-none"
            type="button"
          >
            <p className="px-3 font-open-sans">найти</p>
          </button>
        </TERipple>
      </div>
      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((book) => (
            <div key={book._id} className="flex items-center justify-between p-2 border-b border-gray-200">
               <Link to={`/book/${book._id}`}>   <h3 className="font-semibold">{book.title}</h3></Link>
                  {/* <BookCard key={book._id} book={book} /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
