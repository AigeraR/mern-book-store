import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

const Navigation = () => {
    const categorys = [
        { name: "Fiction", link: "/fiction" },
        { name: "Non-Fiction", link: "/non-fiction" },
        { name: "Comics", link: "/comics" },
        { name: "Biography", link: "/biography" },
        { name: "Children", link: "/children" },
    ];

    return (
        <nav className="flex items-center justify-between px-5 py-2 ">
            <div className="flex space-x-5 justify-center items-center">
                <p className="font-open-sans">Каталог</p>
                <GiHamburgerMenu className='text-2xl' />
                </div>
            <div className="text font-open-sans space-x-12">
                {categorys.map((category) => (
                    <React.Fragment key={category.name}>
                        <a href={category.link}>{category.name}</a>
                    </React.Fragment>
                ))}
            </div>
            <div className="best-sellers">
                <button className='bg-orange-400 text-white font-bold font-open-sans px-5 py-2 rounded-md'>
                    <a href="/best-sellers">Best Sellers</a>
                </button>
            </div>
        </nav>
    );
}

export default Navigation;
