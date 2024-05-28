// src/component/header/UserCart.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';

const UserCart = ({ cartItemCount, userName }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('userName');
        navigate('/login');
    }

    return (
        <div className="flex items-center justify-end space-x-4">
            {userName ? (
                <Link to="/account" className="flex items-center space-x-2">
                    <VscAccount className="h-7 w-7 text-gray-400 hover:text-gray-500" aria-hidden="true" />
                    <span className="text-sm ">{userName}</span>
                </Link>
            ) : (
                <div className='hidden xl:flex lg:flex items-center space-x-3'>
                    <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Войти
                    </a>
                    <span className="inline-block h-6 w-px bg-gray-400" aria-hidden="true" />
                    <a href="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Регистрация
                    </a>
                </div>
            )}
            <div className="relative flex items-center">
                <Link to="/cart" className="group flex items-center">
                    <FiShoppingCart className="h-7 w-7 text-gray-400 hover:text-gray-500" aria-hidden="true" />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-3 left-2 bg-main-color text-white text-sm font-semibold rounded-full h-5 w-6 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </Link>
            </div>
        </div>
    );
}

export default UserCart;
