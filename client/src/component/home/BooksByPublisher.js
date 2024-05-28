import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Импорт useParams для получения параметра маршрута
import Header from '../header/Header';
import Breadcrumbs from '../Breadcrumbs';
const BooksByPublisher = () => {
    const [books, setBooks] = useState([]);
    const { publisherName } = useParams(); // Получение параметра маршрута

    useEffect(() => {
        const fetchBooksByPublisher = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/publisher/${publisherName}`);
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books by publisher:', error);
            }
        };

        fetchBooksByPublisher();
    }, [publisherName]); // Добавление publisherName в зависимости useEffect

    return (
        
        <div>
            <Header />
            <div>
            <Breadcrumbs />
            </div>
            <h1>Книги издательства {publisherName}</h1>
            <ul>
                {books.map(book => (
                    <li key={book._id}>{book.title}</li>
                    
                ))}
            </ul>
        </div>
    );
};

export default BooksByPublisher;
