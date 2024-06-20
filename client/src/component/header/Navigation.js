import React from 'react';

const Navigation = () => {
    const categorys = [
        { name: "Психология", link: "/catalog/6670a442d4fd7fc9ffd71817/6670a9dad4fd7fc9ffd71863" },
        { name: "История", link: "/catalog/66748d8197d1a65d32b74953/66748da997d1a65d32b74974" },
        { name: "Бизнес и экономика", link: "/catalog/6670a462d4fd7fc9ffd7181b" },
        { name: "Наука", link: "/catalog/6670a442d4fd7fc9ffd71817" },
        { name: "Детские", link: "/catalog/6670a87ed4fd7fc9ffd7182b" },
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
