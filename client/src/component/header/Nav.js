import React from 'react';
import { CiDeliveryTruck } from "react-icons/ci";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa';

function Nav() {
    const menuList = [
        {
            name: 'О нас',
            link: '/about'
        },
        {
            name: 'Оплата',
            link: '/payment'
        },
        {
            name: 'Оптовым покупателям',
            link: '/wholesale'
        },
    ];
    return (
        <div className='hidden  lg:flex xl:flex md:flex  grid-cols-3 pl-5 pr-5 p-2  justify-between items-center text-sm font-open-sans shadow-sm border-b border-gray-300  md:text-sx'>
            <div className='justify-center items-center'>
                <p className='text-center md:text-sx lg:text-sm xl:text-sm text-gray-600 font-open-sans '>Откройте миры, приобретая знания</p>
            </div>
            <div className='col-span-1'>
                <div className='flex justify-center space-x-5 items-center font-open-sans text-text-color'>
                    {menuList.map((menu) => (
                        <a href={menu.link} key={menu.name}>
                            {menu.name}
                        </a>
                    ))}
                </div>
            </div>
            <div className='flex justify-center space-x-4'>
                <div className='flex items-center space-x-2'>
                    <FaTruck className='text-xl text-red-700' />
                    <Link to="/delivery"><p className='md:hidden xl:flex lg:flex '>Доставка</p></Link>
                </div>
                <div className='flex items-center space-x-2'>
                    <BsFillTelephoneFill className='text-md text-blue-700'/>
                    <p className='md:hidden xl:flex lg:flex'>+996(708) 17 29 88</p>
                </div>
            </div>
        </div>
    );
}

export default Nav;
