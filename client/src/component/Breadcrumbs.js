import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaAngleRight } from "react-icons/fa6";
const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const [categoriesMapping, setCategoriesMapping] = useState({});

    useEffect(() => {
        // Запрос на получение данных о категориях и подкатегориях
        axios.get('https://mern-book-store-pg5d.onrender.com/api/category/getAllCategories')
            .then(response => {
                const categories = response.data;
                const mapping = {};
                categories.forEach(category => {
                    mapping[category._id] = category.name;
                    category.subcategories.forEach(subcategory => {
                        mapping[subcategory._id] = subcategory.name;
                    });
                });
                setCategoriesMapping(mapping);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <nav className="p-3 rounded-md w-full mb-4">
            <ol className="list-reset flex text-gray-500">
                <li>
                    <Link to="/" className="hover:text-blue-800">Главная</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const translatedValue = categoriesMapping[value] || value;

                    return (
                        <li key={to} className="flex items-center">
                            <span className="mx-2"><FaAngleRight /></span>
                            {isLast ? (
                                <span>{translatedValue}</span>
                            ) : (
                                <Link to={to} className="hover:text-blue-800 capitalize">{translatedValue}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;
