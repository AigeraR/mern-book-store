import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

const Navigation = () => {
    const categorys = [
        { name: "Психология", link: "/fiction" },
        { name: "История", link: "/non-fiction" },
        { name: "Комедия", link: "/comics" },
        { name: "Наука", link: "/biography" },
        { name: "Детские", link: "/children" },
    ];

    return ( 
        <div className="p-2 ">
            <div className="">
                <div className='flex font-open-sans text-md  text-gray-700 '>
                    {categorys.map((category) => (
                        <React.Fragment key={category.name}>
                            <a href={category.link} className='hover:text-text-color font-open-sans hover:border-indigo-600  md:px-2 lg:px-4 '>{category.name}</a>
                        </React.Fragment>
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default Navigation;
