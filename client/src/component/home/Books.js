import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Делаем ТОЛЬКО ОДИН запрос
                const response = await axios.get('https://mern-book-store-pg5d.onrender.com/api/books/allBook');
                
                // На бэкенде уже сделан .populate('author'), 
                // поэтому имя автора уже лежит в book.author.name
                setBooks(response.data); 
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    if (loading) return <div className="text-center p-4 text-gray-500">Загрузка...</div>;
    if (error) return <div className="text-center p-4 text-red-500 font-bold">Ошибка: {error}</div>;

    return (
        <div className="px-5">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {/* Используем slice(0, 10) или просто все книги */}
                {books.map((book) => (
                    <Link to={`/book/${book._id}`} key={book._id} className="group border p-4 rounded-lg flex flex-col hover:shadow-xl transition-all duration-300">
                        <div className="w-full h-48 sm:h-64 flex items-center justify-center overflow-hidden bg-gray-50 rounded-md">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                                loading="lazy"
                            />
                        </div>
                        <div className="mt-4">
                            <p className="text-blue-600 text-lg font-bold">{book.price} сом</p>
                            <h2 className="text-sm font-semibold text-gray-800 truncate" title={book.title}>
                                {book.title}
                            </h2>
                            <p className="text-gray-500 text-xs font-medium">
                                {/* Берем имя из объекта author, который прислал бэкенд */}
                                {book.author?.name || 'Автор не указан'}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Books;