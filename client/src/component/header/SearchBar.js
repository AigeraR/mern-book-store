import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SearchBar = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchResultsRef = useRef(null);
  const navigate = useNavigate();

  // Профессиональный подход: Debounce (задержка запроса)
  // Чтобы не перегружать сервер Render на каждом нажатии клавиши
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        setIsLoading(true);
        try {
          // Используем твой рабочий URL
          const response = await axios.get(
            `https://mern-book-store-pg5d.onrender.com/api/books/searchByName/${searchTerm}`
          );
          setSearchResults(response.data);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 400); // Задержка 400мс

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Закрытие при клике вне области поиска
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setSearchResults([]);
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchResultsRef}>
      <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400 transition-all">
        <FiSearch className="absolute left-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          className="w-full py-2.5 pl-10 pr-4 outline-none text-gray-700 placeholder-gray-400"
          placeholder="Найти книгу или автора..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isLoading && (
          <div className="absolute right-20 animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        )}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 font-medium hover:bg-blue-700 transition-colors">
          Найти
        </button>
      </form>

      {/* Быстрые результаты (Dropdown) */}
      {searchResults.length > 0 && (
        <div className="absolute z-[100] mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
            Результаты поиска
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {searchResults.map((book) => (
              <Link
                key={book._id}
                to={`/book/${book._id}`}
                onClick={() => setSearchResults([])}
                className="flex items-center p-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-none"
              >
                <img
                  src={book.image || 'https://via.placeholder.com/150'}
                  alt={book.title}
                  className="w-10 h-14 object-cover rounded shadow-sm"
                />
                <div className="ml-4">
                  <div className="text-sm font-bold text-gray-800 line-clamp-1">{book.title}</div>
                  <div className="text-xs text-gray-500">{book.author?.name || 'Автор неизвестен'}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;