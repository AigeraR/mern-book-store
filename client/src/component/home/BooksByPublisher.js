import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from '../header/Header';
import BookList from '../catalog/BookList';
import Footer from '../footer/Footer';

const AuthorBook = () => {
    const { publisherId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    const [publisher, setPublisher] = useState(null);

    useEffect(() => {
        const fetchPublisher = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/publisher/getPublisherById/${publisherId}`);
                setPublisher(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        const fetchAllBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books/allBook');
                const publisherBooks = response.data.filter(book => book.publisher._id === publisherId);
                setBooks(publisherBooks);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAllBooks();
        fetchPublisher();
    }, [publisherId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!publisher) return null;

    return (
        <>
            <Header />
            <div className='flex items-center p-4'>
                <Link to="/" className="text-gray-500 hover:text-gray-700 transition duration-200 p-1 ">Главная</Link> &gt;
                <Link to={"/publisher/" + publisherId} className="text-gray-500 hover:text-gray-700 transition duration-200">{publisher && publisher.name}</Link>
            </div>
            <h2 className="text-lg p-5 font-bold mb-4">Книги издания {publisher && publisher.name}</h2>
            <BookList books={books} />
            <Footer />
        </>
    );
};

export default AuthorBook;
