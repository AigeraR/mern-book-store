import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SimilarBooks from './SimilarBooks';
import BookCard from '../../catalog/BookCard';
import BookList from '../../catalog/BookList';
import Books from '../../home/Books';
import Header from '../Header';
import Footer from '../../footer/Footer';
const AuthorBook = () => {
    const { authorId } = useParams();
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFullBio, setShowFullBio] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/author/getAuthorById/${authorId}`);
                setAuthor(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        const fetchAllBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books/allBook');
                const authorBooks = response.data.filter(book => book.author._id === authorId);
                setBooks(authorBooks);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAllBooks();
        fetchAuthor();
    }, [authorId]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Error: {error}</div>;

    const toggleBioVisibility = () => {
        setShowFullBio(!showFullBio);
    };

    return (
        <div className=''>
            <Header />
            <div className='flex items-center p-4'>
                <Link to="/" className="text-gray-500 hover:text-gray-700 transition duration-200 p-1 ">Главная</Link> &gt;
                <Link to={"/author/" + authorId} className="text-gray-500 hover:text-gray-700 transition duration-200">{author && author.name}</Link>
            </div>
            <div className='container mx-auto px-4 items-center justify-center pl-12 '>
                {author && (
                    <div className="flex items-center">
                        <img src={author.img} alt={author.name} className="w-32 h-32 object-cover rounded-full mr-4" />
                        <div>
                            <h1 className="text-xl font-bold">{author.name}</h1>
                            <p className="text-gray-600">{showFullBio ? author.bio : `${author.bio.slice(0, 100)}...`}</p>
                            {author.bio.length > 100 && (
                                <button className="text-blue-500 hover:underline" onClick={toggleBioVisibility}>
                                    {showFullBio ? 'Скрыть биографию' : 'Показать полностью'}
                                </button>
                            )}
                        </div>
                    </div>
                )}
                <div className="mt-8">
                    <h2 className="text-lg font-bold mb-4">Книги автора</h2>
                    <BookList books={books} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthorBook;
