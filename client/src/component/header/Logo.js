import React from 'react';
import { FaBookReader } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <Link to="/" className='flex xl:w-full lg:w-full md:w-6 w-3 h-full  '>
                {/* <FaBookReader className='text-4xl md:text-md text-main-color ' /> */}
                <img src='https://t4.ftcdn.net/jpg/05/07/19/83/360_F_507198344_PPZmZ0ShfTohJBPUv7Dh0ATswkJrPjtr.jpg' alt='logo' className='w-14 h-12 hidden md:flex xl:flex lg:flex mb-2' />
                <p className='text-2xl mt-2 md:text-md text-green-500 font-bold hover:text-purple-600 font-open-sans '>
                    Bookmark
                </p>
            </Link>
        </div>
    );
}

export default Logo;
