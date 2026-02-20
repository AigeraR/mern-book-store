import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';

const UserCart = ({ cartItemCount, userName }) => {
    // Добавляем локальное состояние для роли, чтобы React "видел" изменения
    const [role, setRole] = useState(localStorage.getItem('role'));

    // Следим за изменением userName (обычно меняется при входе/выходе)
    useEffect(() => {
        setRole(localStorage.getItem('role'));
    }, [userName]); 

    return (
        <div className="flex items-center justify-end space-x-4">
            {userName ? (
                /* Используем четкое условие: если админ - одна ссылка, иначе - другая */
                role === 'admin' ? (
                    <Link to="/admin" className="flex flex-col items-center">
                        <MdAccountCircle className="h-5 w-5 text-blue-500 hover:text-red-500" />
                        <span className="text-[10px] font-bold">Админ</span>
                    </Link>
                ) : (
                    <Link to="/account" className="flex flex-col items-center">
                        <FaUserAlt className="h-4 w-4 text-blue-500 hover:text-red-500" />
                        <span className="text-[10px] font-bold">{userName}</span>
                    </Link>
                )
            ) : (
                <div className='flex items-center space-x-3'>
                    <Link to="/login" className="text-xs">Войти</Link>
                    <span className="h-6 w-px bg-gray-400" />
                    <Link to="/register" className="text-xs">Регистрация</Link>
                </div>
            )}

            <div className="relative">
                <Link to="/cart">
                    <FiShoppingCart className="h-7 w-7 text-gray-400" />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default UserCart;