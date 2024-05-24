import React from 'react';
import { FaBookReader } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link>
            <div className="flex items-center p-2 space-x-2">
                <FaBookReader className='text-4xl  text-main-color' />
                <p className='text-2xl  text-orange-500 font-bold'>
                    BookMark
                </p>
            </div>
        </Link>

    );
}

export default Logo;
