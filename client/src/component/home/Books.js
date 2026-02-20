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
                const response = await axios.get('https://mern-book-store-pg5d.onrender.com/api/books/allBook');
                const booksData = response.data;

                // Создаем массив запросов для получения авторов
                const authorRequests = booksData.map(book =>
                    axios.get(`https://mern-book-store-pg5d.onrender.com/api/author/getAuthorById/${book.author._id}`)
                );

                // Выполняем все запросы параллельно
                const authorsResponse = await Promise.all(authorRequests);
                const authorsData = authorsResponse.map(res => res.data);

                // Соотносим имена авторов с книгами
                const booksWithAuthors = booksData.map((book, index) => ({
                    ...book,
                    authorName: authorsData[index].name
                }));

                setBooks(booksWithAuthors);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    if (loading) return <div className="text-center p-4">Загрузка...</div>;
    if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    if (!loading && books.length === 0) return <div className="text-center p-4">Книги не найдены</div>;

    return (
        <div className="pl-5 pr-5">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {books.slice(10, 20).map((book) => (
                    <Link to={`/book/${book._id}`} key={book._id} className="relative border p-4 rounded-lg flex flex-col transition-transform duration-200 transform hover:scale-105">
                        <div className="w-full h-48 sm:h-40 md:h-48 lg:h-56 xl:h-64 flex items-center justify-center overflow-hidden">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-full h-full object-contain rounded-md shadow-md"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }}
                                loading="lazy"
                            />
                        </div>
                        <h2 className="text-gray-800 text-lg sm:text-md md:text-lg font-bold pt-4 truncate">{`${book.price} сом`}</h2>
                        <h2 className="text-sm sm:text-sm md:text-md font-semibold truncate">{book.title}</h2>
                        <p className="text-gray-400 text-xs sm:text-sm md:text-base font-bold truncate">{book.authorName}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Books;
