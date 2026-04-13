import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BestSeller() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://mern-book-store-pg5d.onrender.com/api/books/bestsellers');
                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    if (loading) return <div className="p-10 text-center">Загрузка...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="p-4 container mx-auto">
            <h1 className="text-xl font-bold p-9 italic uppercase tracking-wider text-gray-800">
                Книжные бестселлеры
            </h1>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {books.map((book) => (
                    <Link to={`/book/${book._id}`} key={book._id} className="h-full">
                        {/* Добавили h-full и flex flex-col */}
                        <div className="relative border p-4 rounded-lg flex flex-col h-full bg-white hover:shadow-lg transition-shadow duration-300">
                            
                            {/* Фиксированная высота для области изображения */}
                            <div className="w-full h-48 sm:h-56 flex items-center justify-center overflow-hidden bg-gray-50 rounded">
                                <img 
                                    src={book.image} 
                                    alt={book.title} 
                                    className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-110" 
                                />
                            </div>

                            {/* Контентная часть */}
                            <div className="flex flex-col flex-grow pt-4">
                                <h2 className="text-gray-900 text-lg font-bold">{book.price} сом</h2>
                                
                                {/* line-clamp-2 ограничит название 2 строками, чтобы высота была одинаковой */}
                                <h2 className="text-sm font-semibold text-gray-800 mt-1 line-clamp-2 min-h-[40px]">
                                    {book.title}
                                </h2>
                                
                                <p className="text-gray-400 text-xs mt-auto pt-2 font-bold truncate">
                                    {book.author?.name || "Автор неизвестен"}
                                </p>
                            </div>

                            {/* Метка бестселлера */}
                            <div className='absolute top-2 left-0 w-28 bg-orange-500 rounded-r-lg shadow-md'>
                                <p className='py-1 text-xs text-center text-white font-bold uppercase tracking-tighter'>
                                    бестселлер
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default BestSeller;