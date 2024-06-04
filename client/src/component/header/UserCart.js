import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { FaUserAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";


const UserCart = ({ cartItemCount, userName }) => {
    return (
        <div className="flex items-center justify-end space-x-4">
            {userName ? (
                        <Link to="/account" className="flex-col flex items-center justify-center space-y-1">
                            <FaUserAlt className="h-4 w-4 xl:h-5 xl:w-5 lg:h-4 lg:w-4 md:h-4 md:w-4 text-blue-400 hover:text-red-500 " aria-hidden="true" />
                            <span className="text-xs font-open-sans font-bold">Аккаунт</span>
                        </Link>
            ) : (
                <>
                    <div className='flex  items-center space-x-3'>
                        <Link to="/login" className="text-xs font-medium text-gray-700 hover:text-gray-800 ">
                            Войти
                        </Link>
                        <span className="inline-block h-6 w-px bg-gray-400" aria-hidden="true" />
                        <Link to="/register" className="text-xs font-medium text-gray-700 hover:text-gray-800">
                            Регистрация
                        </Link>
                    </div>
                    
                </>
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
