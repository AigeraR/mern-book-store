// src/components/Publishers.js

import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link для маршрутизации
import axios from 'axios';
import { useState, useEffect } from 'react';

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
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 bg-gray-100 p-4">
                {publishers.map(publisher => (
                    <Link to={`/publisher/${publisher.name}`} key={publisher._id} className="flex justify-center items-center p-4 rounded-md hover:shadow-lg">
                    <img src={publisher.logoUrl} alt={publisher.name} className="h-16 xl:h-24 lg:20 md:16 object-contain" />
                </Link>
                ))}
            </div>
        </div>
    );
};

export default Publishers;