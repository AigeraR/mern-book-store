import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

import BookList from '../catalog/BookList';
import Header from './Header';
import Footer from '../footer/Footer';
import SortOptions from '../catalog/SortOptions';

const SearchResults = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://mern-book-store-pg5d.onrender.com/api/books/searchByName/${query}`
        );
        setBooks(response.data);
      } catch (error) {
        console.error('Ошибка поиска:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchSearchData();
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <nav className="text-sm mb-6 flex items-center space-x-2 text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition">Главная</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Поиск</span>
        </nav>

        <div className="mb-8 border-b pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Результаты поиска: <span className="text-blue-600">«{query}»</span>
          </h1>
          <p className="text-gray-500 mt-2">
            {loading ? 'Ищем...' : `Найдено книг: ${books.length}`}
          </p>
        </div>
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-500">Минутку, подбираем книги...</p>
          </div>
        ) : books.length > 0 ? (
          /* Удаляем лишний div class="grid...", 
             так как BookList внутри себя уже имеет сетку.
          */
          <div className="w-full">
            <BookList books={books} />
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 font-semibold">Ничего не найдено</p>
            <p className="text-gray-400 mt-2">Попробуйте ввести другое название или фамилию автора</p>
            <Link
              to="/"
              className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Вернуться на главную
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;