// SearchResults.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BookList from '../catalog/BookList';


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('query');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://mern-book-store-pg5d.onrender.com/api/books/searchByName/${searchTerm}`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchTerm) {
      fetchSearchResults();
    }
  }, [searchTerm]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">По запросу «{searchTerm}» найдено {books.length} товаров:</h2>
      <BookList books={books} />
    </div>
  );
};

export default SearchResults;
