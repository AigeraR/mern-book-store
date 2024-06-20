import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PriceSlider from './PriceSlider';
import { MdKeyboardArrowLeft } from "react-icons/md";

const CategoryMenu = ({ categories, selectedAuthors, setSelectedAuthors, selectedPublishers, setSelectedPublishers, priceRange, setPriceRange }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [authorSearchQuery, setAuthorSearchQuery] = useState('');
    const [publisherSearchQuery, setPublisherSearchQuery] = useState('');

    useEffect(() => {
        fetchAuthors();
        fetchPublishers();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/author/getAuthors');
            setAuthors(response.data);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    const fetchPublishers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/publisher/getAll');
            setPublishers(response.data);
        } catch (error) {
            console.error('Error fetching publishers:', error);
        }
    };

    const handleClick = (categoryId) => {
        setActiveCategory(activeCategory === categoryId ? null : categoryId);
    };

    const handleAuthorChange = (authorId) => {
        const updatedSelectedAuthors = selectedAuthors.includes(authorId)
            ? selectedAuthors.filter(id => id !== authorId)
            : [...selectedAuthors, authorId];
        setSelectedAuthors(updatedSelectedAuthors);
    };

    const handlePublisherChange = (publisherId) => {
        const updatedSelectedPublishers = selectedPublishers.includes(publisherId)
            ? selectedPublishers.filter(id => id !== publisherId)
            : [...selectedPublishers, publisherId];
        setSelectedPublishers(updatedSelectedPublishers);
    };

    const handleAuthorSearchInputChange = (e) => {
        setAuthorSearchQuery(e.target.value);
    };

    const handlePublisherSearchInputChange = (e) => {
        setPublisherSearchQuery(e.target.value);
    };

    return (
        <div className="w-full md:w-1/5 p-4 bg-white text-sm">
            <h2 className="text-lg font-semibold mb-2">
                <Link to="/catalog" className="text-gray-500 flex hover:text-blue-700 items-center">
                    <MdKeyboardArrowLeft className='mr-2 w-7 h-5' /> Все категории
                </Link>
            </h2>
            <ul>
                {categories.map(category => (
                    <li key={category._id}>
                        <button
                            className={`w-full text-left p-1.5 focus:outline-none ${activeCategory === category._id ? 'bg-green-50 text-gray-600 font-bold' : ''}`}
                            onClick={() => handleClick(category._id)}
                        >
                            <Link to={`/catalog/${category._id}`} >{category.name}</Link>
                        </button>
                        {activeCategory === category._id && (
                            <ul className="pl-7 mt-2">
                                {category.subcategories.map(subcategory => (
                                    <li key={subcategory._id}>
                                        <Link
                                            to={`/catalog/${category._id}/${subcategory._id}`}
                                            className=" hover:text-blue-500"
                                        >
                                            <p className='text-sm py-1'> {subcategory.name}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            {/* Поиск по авторам */}
            <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Авторы</h2>
                <input
                    type="text"
                    placeholder="Поиск по авторам"
                    className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                    value={authorSearchQuery}
                    onChange={handleAuthorSearchInputChange}
                />
                {/* Чекбоксы авторов */}
                {authors
                    .filter(author => author.name.toLowerCase().includes(authorSearchQuery.toLowerCase()))
                    .slice(0, 10) // Ограничение до 10 авторов
                    .map(author => (
                        <div key={author._id} className="flex items-center text-sm mb-1">
                            <input
                                type="checkbox"
                                id={author._id}
                                name={author._id}
                                checked={selectedAuthors.includes(author._id)}
                                onChange={() => handleAuthorChange(author._id)}
                                className="mr-2 w-4 h-4"
                            />
                            <label htmlFor={author._id} className="">{author.name}</label>
                        </div>
                    ))}

            </div>
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Издательства</h2>
                <input
                    type="text"
                    placeholder="Поиск по Издательствам"
                    className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                    value={publisherSearchQuery}
                    onChange={handlePublisherSearchInputChange}
                />
                {/* Чекбоксы Издательств */}
                {publishers
                    .filter(publisher => publisher.name.toLowerCase().includes(publisherSearchQuery.toLowerCase()))
                    .map(publisher => (
                        <div key={publisher._id} className="flex items-center text-sm mb-1">
                            <input
                                type="checkbox"
                                id={publisher._id}
                                name={publisher._id}
                                checked={selectedPublishers.includes(publisher._id)}
                                onChange={() => handlePublisherChange(publisher._id)}
                                className="mr-2 w-4 h-4"
                            />
                            <label htmlFor={publisher._id}>{publisher.name}</label>
                        </div>
                    ))}
            </div>
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Цена</h2>
                <PriceSlider priceRange={priceRange} setPriceRange={setPriceRange} />
            </div>
        </div>
    );
};

export default CategoryMenu;
