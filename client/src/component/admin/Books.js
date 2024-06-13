import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddBook from './AddBook';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        fetchBooks();
        fetchAuthors();
        fetchCategories();
        fetchPublishers();
    }, []);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:5000/api/books/allBook');
        setBooks(response.data);
    };

    const fetchAuthors = async () => {
        const response = await axios.get('http://localhost:5000/api/author/getAuthors');
        setAuthors(response.data);
    };

    const fetchCategories = async () => {
        const response = await axios.get('http://localhost:5000/api/category/getAllCategories');
        setCategories(response.data);
    };

    const fetchPublishers = async () => {

        const response = await axios.get('http://localhost:5000/api/publisher/getAll');
        setPublishers(response.data);

    }; console.log(publishers);

    const handleDeleteBook = async (bookId) => {
        await axios.delete(`http://localhost:5000/api/books/delete/${bookId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        fetchBooks();
    };

    const handleUpdateBook = async (bookId, updatedBook) => {
        await axios.put(`http://localhost:5000/api/books/update/${bookId}`, updatedBook, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        fetchBooks();
    };

    const getAuthorName = (authorId) => {
        const author = authors.find(author => author._id === authorId);
        return author ? author.name : 'Unknown';
    };



    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getAuthorName(book.author).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4 text-sm">
            <h2 className="text-3xl font-semibold mb-6">Книги</h2>
            <AddBook fetchBooks={fetchBooks} /> {/* Use the AddBook component */}

            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <h3 className="text-xl font-bold mb-4">Управление книгами</h3>
                <div className=" shadow-md mb-6">
                    <h3 className="text-xl font-bold mb-4">Поиск</h3>
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border p-2 mb-2" />
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className=''>
                        <tr>
                            <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">№</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Автор</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Цена</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Количество</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Бестселлер</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Изображение</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Издатель</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredBooks.map((book, index) => (
                            <tr key={book._id}>
                                <td className="px-3 py-2 whitespace-wrap text-xs">{index + 1}</td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">{book.title}</td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">{getAuthorName(book.author.name)}</td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">{book.description}</td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">{book.price} сом</td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">{book.quantity}</td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">
                                    <input type="checkbox" checked={book.isBestseller} onChange={(e) => handleUpdateBook(book._id, { ...book, isBestseller: e.target.checked })} />
                                </td>
                                <td className="px-3 py-2 whitespace-wrap text-sm">
                                    <img src={book.image} alt={book.title} className="w-16 h-16 object-cover" />
                                </td>
                                <td className="px-3 py-2 whitespace-wrap text-sm">{book.publisher.name}</td>
                                <td className="px-2 py-2 whitespace-wrap text-sm justify-center space-x-2">
                                    <button onClick={() => handleDeleteBook(book._id)} className="bg-red-500 text-white p-1.5 rounded-lg"><RiDeleteBin6Line className='h-4 w-4' /></button>
                                    <button onClick={() => handleUpdateBook(book._id, book)} className="bg-green-500 text-white p-1.5 rounded-lg mr-2"><FaEdit className='h-4 w-4' /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Books;
