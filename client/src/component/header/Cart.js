import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const calculateTotal = () => {
            const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotal(totalAmount);
        };

        calculateTotal();
    }, [cartItems]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Корзина</h1>
            {cartItems.length === 0 ? (
                <p>Ваша корзина пуста. <Link to="/catalog" className="text-blue-500">Перейти к покупкам</Link></p>
            ) : (
                <>
                    <div className="space-y-6">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex items-center space-x-4 p-4 border rounded-md shadow-md">
                                <img src={item.image} alt={item.title} className="w-20 h-28 object-cover rounded-md" />
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-gray-600">Автор: {item.author.name}</p>
                                    <p className="text-gray-600">Цена: {item.price} сом</p>
                                    <div className="flex items-center mt-2">
                                        <button
                                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
                                            onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
                                            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                                    onClick={() => onRemoveFromCart(item._id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-between items-center">
                        <p className="text-xl font-semibold">Итого: {total} сом</p>
                        <button className="px-6 py-2 bg-green-500 text-white rounded-md">Оформить заказ</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
