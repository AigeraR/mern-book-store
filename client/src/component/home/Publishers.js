// src/components/Publishers.js

import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link для маршрутизации
import axios from 'axios';
import { useState, useEffect } from 'react';
import { transliterate } from '../utils/transliterate';
const Publishers = () => {
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/publisher/getAll')
            .then(response => setPublishers(response.data))
            .catch(error => console.error('Error fetching publishers:', error));
    }, []);

    return (
        <div className="container mx-auto py-8 p-3">
            <h2 className="text-xl font-bold mb-4 p-4 lg:text-md md:sm">Редакции и издательства</h2>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 bg-gray-50 p-4">
                {publishers.map(publisher => (
                    <Link to={`/publisher/${publisher._id}`} key={publisher._id} className="flex justify-center items-center p-4 rounded-md hover:shadow-lg">
                    <img src={publisher.logoUrl} alt={publisher.name} className="h-16 xl:h-24 lg:h-20 md:h-16 object-contain" />
                </Link>
                ))}
            </div>
        </div>
    );
};

export default Publishers;
