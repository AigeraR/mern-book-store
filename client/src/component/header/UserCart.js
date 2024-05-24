import React from 'react';
import { Link } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";

const UserCart = () => {
    return (
        <div className="flex items-center space-x-3">
            <div className='flex text-text-color font-open-sans font-bold items-center px-5 py-2 rounded-lg cursor-pointer underline underline-offset-4 decoration-dotted space-x-3'>
                <Link to="/login" >
                    {/* <VscAccount className="text-2xl" /> */}
                    Вход
                </Link>
                <div className=''>/</div>
                <Link to="/register" >
                    Регистрация
                </Link>
            </div>

            <Link to="/cart" className='flex items-center  bg-blue-500 text-white px-5 py-2 rounded-lg cursor-pointer'>
                <FiShoppingCart className=" text-2xl" />
            </Link>
        </div>
    );
}

export default UserCart;
