import React from 'react';
import { FaBookReader } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="hidden xl:flex lg:flex md:flex items-center space-x-2">
            <Link to="/" className='flex'>
                <FaBookReader className='text-4xl md:text-md text-main-color ' />
                <p className='text-2xl md:text-md text-orange-500 font-bold'>
                    BookMark
                </p>
            </Link>
        </div>
    );
}

export default Logo;
