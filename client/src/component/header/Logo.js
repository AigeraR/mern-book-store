import React from 'react';
import { FaBookReader } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <Link to="/" className='flex xl:w-full lg:w-full md:w-6 w-3 h-full  '>
                <FaBookReader className='text-4xl md:text-md text-main-color ' />
                <p className='text-2xl md:text-md text-orange-500 font-bold'>
                    BookMark
                </p>
            </Link>
        </div>
    );
}

export default Logo;
