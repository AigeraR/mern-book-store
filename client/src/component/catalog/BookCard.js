import React from 'react';
import { FaBookmark } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ book }) => {
    const addToCart = async () => {
        try {
            const token  = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(`http://localhost:5000/api/books/addToCart/${book._id}` , config);
            console.log(response.data); 
            alert('Товар добавлен в корзину'); 
        } catch (error) {
            console.error('Ошибка при добавлении товара в корзину:', error);
            alert('Произошла ошибка при добавлении товара в корзину'); 
        }
    };

    return (
        <div className="border p-4 text-start relative bg-white shadow-md hover:shadow-lg transition-shadow h-full flex flex-col justify-between">
            {book.isBestseller && <span className="absolute top-0 left-0 bg-orange-600 text-white p-1 rounded-br-lg">бестселлер</span>}
            <div>
                <Link to={`/book/${book._id}`}>
                    <img src={book.image} alt={book.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
                    <p className="font-bold mb-1">{book.price} сом</p>
                    <h3 className="text-md font-semibold text-gray-600 line-clamp-2 overflow-hidden">{book.title}</h3>
                    <p className="text-gray-500 text-sm">{book.author.name}</p>
                </Link>
            </div>
            <div className="flex justify-between items-center mt-4">
                <button onClick={addToCart} className="py-1 px-7 border border-gray-500 rounded-md hover:bg-green-500 hover:text-white transition-colors" >
                    В корзину
                </button>
                <FaBookmark className="w-6 h-6 text-gray-500 hover:text-orange-500" />
            </div>
        </div>
    );
};

export default BookCard;
