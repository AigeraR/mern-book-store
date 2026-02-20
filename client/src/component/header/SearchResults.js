import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

import BookList from '../catalog/BookList'; // Предполагаю, у тебя есть этот компонент
import Header from './Header';
import Footer from '../footer/Footer';

const SearchResults = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Получаем поисковый запрос из URL (например, ?query=стивен+кинг)
    const query = new URLSearchParams(useLocation().search).get('query');

    useEffect(() => {
        const fetchSearchData = async () => {
            setLoading(true);
            try {
                // ВАЖНО: Используем новый эндпоинт, который ищет по всему
                const response = await axios.get(`https://mern-book-store-pg5d.onrender.com/api/books/searchByName/${query}`);
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
        <>
            <Header/>
            <div className="container mx-auto px-4 py-8 min-h-screen">
                {/* Хлебные крошки */}
                <nav className="text-sm mb-6">
                    <Link to="/" className="text-gray-500 hover:text-gray-700">Главная</Link> &gt; 
                    <span className="text-gray-600 ml-2">Результаты поиска</span>
                </nav>

                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Результаты по запросу: <span className="text-blue-600">«{query}»</span>
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : books.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                         <BookList books={books} />
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed">
                        <p className="text-xl text-gray-500">Ничего не найдено по вашему запросу 😔</p>
                        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Вернуться на главную</Link>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    );
};

export default SearchResults;