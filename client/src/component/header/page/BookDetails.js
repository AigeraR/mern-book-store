import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SimilarBooks from './SimilarBooks'; // Импорт компонента SimilarBooks
import Header from '../Header';

const BookDetails = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [similarBooks, setSimilarBooks] = useState([]);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/getBookById/${bookId}`);
                setBook(response.data);
                const similarResponse = await axios.get(`http://localhost:5000/api/books/similar/${bookId}`);
                setSimilarBooks(similarResponse.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [bookId]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <nav className="text-sm mb-6">
                    <Link to="/" className="text-gray-500 hover:text-gray-700 transition duration-200">Главная</Link> &gt;
                    <Link to="/catalog" className="text-gray-500 hover:text-gray-700 transition duration-200">Каталог</Link> &gt;
                    <Link to={`/catalog/${book.category._id}`} className="text-gray-500 hover:text-gray-700 transition duration-200">{book.category.name}</Link> &gt;
                    <Link to={`/catalog/${book.category._id}/${book.subcategory._id}`} className="text-gray-500 hover:text-gray-700 transition duration-200">{book.subcategory.name}</Link> &gt;
                    <span className="text-gray-600">{book.title}</span>
                </nav>
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    {/* Колонка 1: Изображение книги */}
                    <div className="lg:w-56 mb-8 lg:mb-0 xl:w-60 md:w-30 w-20">
                        <img src={book.image} alt={book.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                    </div>
                    {/* Колонка 2: Информация о книге */}
                    <div className="lg:w-2/5 flex flex-col space-y-3">
                        <h2 className="text-xl font-bold text-gray-800">{book.title}</h2>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-sm text-gray-700">Автор:</span>
                            <span className="text-gray-600 text-sm">{book.author.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-700 text-sm">Категория:</span>
                            <span className="text-gray-600">{book.category.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-sm text-gray-700">Подкатегория:</span>
                            <span className="text-gray-600">{book.subcategory.name}</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-500">О книге</div>
                        <p className="text-gray-600 leading-relaxed text-sm">{book.description}</p>
                    </div>
                    {/* Колонка 3: Действия */}
                    <div className="lg:w-1/5 flex flex-col items-start overflow-hidden space-y-4 border border-gray-500 shadow-md p-7">
                        {book.quantity > 0 ? (
                            <div className="text-green-600 font-semibold text-lg">В наличии</div>
                        ) : (
                            <div className="text-red-600 font-semibold text-lg">Нет в наличии</div>
                        )}
                        <div className="text-2xl font-bold text-gray-800">{book.price} сом</div>
                        {book.quantity > 0 ? (
                            <button className="w-full py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-200">
                                Добавить в корзину
                            </button>
                        ) : (
                            <button className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition duration-200">
                                Сообщим, когда будет
                            </button>
                        )}
                        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-200">
                            Отложить в избранное
                        </button>
                        <div>
                            <p className="text-gray-500 text-md mb-2">Характеристики</p>
                            <div className="w-full h-1 bg-gray-300"></div>
                            <ul className="text-gray-600">
                                <li>Автор: {book.author.name}</li>
                                <li>Издатель: {book.publisher.name}</li>
                                <li>Год издания: {book.published_date}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <SimilarBooks books={similarBooks} />
            </div>
        </>
    );
};

export default BookDetails;
