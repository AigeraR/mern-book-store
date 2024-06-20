import React from 'react';
import { FaBookmark } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ book }) => {
    const addToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(`http://localhost:5000/api/books/addToCart/${book._id}`, {}, config);
            console.log(response.data);
            alert('Товар добавлен в корзину');
        } catch (error) {
            console.error('Ошибка при добавлении товара в корзину:', error);
            alert('Произошла ошибка при добавлении товара в корзину');
        }
    };

    return (
        <div key={book._id} className="relative p-4 mb-6 border rounded-md flex flex-col items-center space-y-3 w-40 sm:w-48 lg:w-56 h-80 sm:h-96 overflow-hidden">
            {
                book.isBestseller && (
                    <span className="absolute top-0 left-0 bg-orange-600 text-white p-1 rounded-br-lg z-10">
                        Бестселлер
                    </span>
                )
            }
            <Link to={`/book/${book._id}`} className="block mb-2 flex-shrink-0">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-32 h-48 sm:w-40 sm:h-56 object-cover rounded-md shadow-md"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }}
                />
            </Link>
            <div className="text-center flex flex-col items-center flex-grow">
                <h3 className="text-sm font-semibold text-gray-800 p-1 truncate w-full">{book.title}</h3>
                <p className="text-sm text-gray-600 truncate w-full">{book.author.name}</p>
                <p className="text-sm font-bold">{book.price} сом</p>
                <div className="flex justify-center items-center space-x-3 mt-2">
                    <button onClick={addToCart} className="text-sm border border-gray-400 px-3 py-1 rounded-md hover:bg-green-400 hover:text-white">
                        В корзину
                    </button>
                    <FaBookmark className='w-5 h-5 hover:text-orange-500' />
                </div>
            </div>
        </div>
    );
};

export default BookCard;
