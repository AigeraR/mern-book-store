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
                const response = await axios.get('http://localhost:5000/api/books/allBook');
                const booksData = response.data;

                // Создаем массив запросов для получения авторов
                const authorRequests = booksData.map(book =>
                    axios.get(`http://localhost:5000/api/author/getAuthorById/${book.author._id}`)
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4 items-center">
            <h1 className="text-sm font-bold p-9 sm:text-sm md:text-md xl:text-xl lg:text-lg italic">Книги</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {books.map((book) => (
                    <div key={book._id} className="relative border p-4 rounded-lg flex flex-col">
                        <div className="w-full h-48 sm:h-40 md:h-48 lg:h-56 xl:h-64 flex items-center justify-center overflow-hidden">
                            <img src={book.image} alt={book.title} className="max-h-full max-w-full object-contain" />
                        </div>
                        <h2 className="text-gray-800 text-lg sm:text-md md:text-lg font-bold pt-4">{`${book.price} сом`}</h2>
                        <p className="text-gray-400 text-xs sm:text-sm md:text-base">{book.category.name}</p>
                        <h2 className="text-sm sm:text-sm md:text-md font-semibold">{book.title}</h2>
                        <p className="text-gray-400 text-xs sm:text-sm md:text-base font-bold">{book.authorName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books;
