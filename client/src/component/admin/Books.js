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
    const [editingBook, setEditingBook] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [expandedBookId, setExpandedBookId] = useState(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetchBooks();
        fetchAuthors();
        fetchCategories();
        fetchPublishers();
    }, []);

    const fetchBooks = async () => {
        const response = await axios.get('https://mern-book-store-pg5d.onrender.com/api/books/allBook');
        setBooks(response.data);
    };

    const fetchAuthors = async () => {
        const response = await axios.get('https://mern-book-store-pg5d.onrender.com/api/author/getAuthors');
        setAuthors(response.data);
    };

    const fetchCategories = async () => {
        const response = await axios.get('https://mern-book-store-pg5d.onrender.com/api/category/getAllCategories');
        setCategories(response.data);
    };

    const fetchPublishers = async () => {
        const response = await axios.get('https://mern-book-store-pg5d.onrender.com/api/publisher/getAll');
        setPublishers(response.data);
    };

    const handleDeleteBook = async (bookId) => {
        await axios.delete(`https://mern-book-store-pg5d.onrender.com/api/books/delete/${bookId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        fetchBooks();
    };
    const handleUpdateBook = async (bookId, updatedBook) => {
        if (editingBook && editingBook.author && updatedBook.author && updatedBook.author._id !== editingBook.author._id) {
            const newAuthor = await authors.find(author => author._id === updatedBook.author._id);
            updatedBook = { ...updatedBook, author: newAuthor };
        }
        await axios.put(`https://mern-book-store-pg5d.onrender.com/api/books/update/${bookId}`, updatedBook, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        fetchBooks();
        setEditingBook(null);
    };
    const getAuthorName = (authorId) => {
        const author = authors.find(author => author._id === authorId);
        return author ? author.name : 'Unknown';
    };
    const startEditingBook = (book) => {
        setEditingBook(book);
        const categoryId = book.category._id; // Получаем идентификатор категории из книги
        updateSubcategories(categoryId); // Обновляем подкатегории
    };
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingBook(prevBook => {
            const updatedBook = { ...prevBook, [name]: value };
            if (name === 'category') {
                const categoryId = value;
                updateSubcategories(categoryId); // Обновляем подкатегории при изменении категории
            }
            if (name === 'author') {
                const authorId = value;
                const author = authors.find(author => author._id === authorId);
                updatedBook.author = author;
            }
            if (name === 'publisher') {
                const publisherId = value;
                const publisher = publishers.find(publisher => publisher._id === publisherId);
                updatedBook.publisher = publisher;
            }
            if (name === 'subCategory') {
                const subCategoryId = value;
                const subCategory = subcategories.find(subCategory => subCategory._id === subCategoryId);
                updatedBook.subCategory = subCategory;
            }
            if (name == 'book') {
                const bookId = value;
                const book = authors.books.find(book => book._id === bookId);
                updatedBook.book = book;
            }
            return updatedBook;
        });
    };

    const updateSubcategories = async (categoryId) => {
        if (!categoryId) return;
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`https://mern-book-store-pg5d.onrender.com/api/category/getSubcategoryArray/${categoryId}`, config);
            setSubcategories(response.data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        handleEditChange(e); // Обновлен вызов метода
        if (categoryId) {
            updateSubcategories(categoryId);
        } else {
            setSubcategories([]);
        }
    };

    const handleToggleDescription = (bookId) => {
        setExpandedBookId(prevId => prevId === bookId ? null : bookId);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getAuthorName(book.author._id).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleShowAll = () => {
        setShowAll(prevShowAll => !prevShowAll);
    }

    return (
        <div className="container mx-auto p-4 text-sm">
            <h2 className="text-3xl font-semibold mb-6">Книги</h2>
            <AddBook fetchBooks={fetchBooks} /> {/* Use the AddBook component */}

            <div className="mb-6">
                <h3 className="text-md font-bold mb-4">Поиск</h3>
                <input
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
                    placeholder="поиск автора и названия..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <h3 className="text-xl font-bold mb-4">Управление книгами</h3>
            <div className="bg-white p-6 rounded-lg overflow-x-auto">

                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">№</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Автор</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Цена</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Количество</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Бестселлер</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Изображение</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категория</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Подкатегория</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Издатель</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredBooks.slice(0, showAll ? books.length : 5).map((book, index) => (
                            <tr key={book._id}>
                                <td className="px-3 py-2 whitespace-wrap text-xs">{index + 1}</td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">{book.title}</td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">{(book.author.name ? book.author.name : '')}</td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">
                                    {expandedBookId === book._id
                                        ? book.description
                                        : `${book.description.substring(0, 20)}... `}
                                    <button onClick={() => handleToggleDescription(book._id)} className="text-blue-500 hover:text-blue-700">
                                        {expandedBookId === book._id ? 'Скрыть' : 'Подробнее'}
                                    </button>
                                </td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">{book.price} сом</td>
                                <td className="px-2 py-2 whitespace-wrap text-xs">{book.quantity}</td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">
                                    <input
                                        type="checkbox"
                                        checked={book.isBestseller}
                                        onChange={(e) => handleUpdateBook(book._id, { ...book, isBestseller: e.target.checked })}
                                    />
                                </td>
                                <td className="px-3 py-2 whitespace-wrap text-sm">
                                    <img src={book.image} alt={book.title} className="w-16 h-16 object-cover" />
                                </td>
                                <td className="px-3 py-2 whitespace-wrap text-xs">{book.category.name}</td>
                                <td className='px-3 py-2 whitespace-wrap text-xs'>{book.subcategory.name}</td>
                                <td className="px-3 py-2 whitespace-wrap text-sm">{(book.publisher && book.publisher.name)}</td>
                                <td className="px-2 py-2 whitespace-wrap text-sm justify-center space-x-2">
                                    <button onClick={() => handleDeleteBook(book._id)} className="bg-red-500 text-white p-1.5 rounded-lg">
                                        <RiDeleteBin6Line className='h-4 w-4' />
                                    </button>
                                    <button onClick={() => startEditingBook(book)} className="bg-green-500 text-white p-1.5 rounded-lg mr-2">
                                        <FaEdit className='h-4 w-4' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-start mt-4">
                    <button onClick={handleShowAll} className="bg-blue-500 text-white p-2 rounded-lg">
                        {showAll ? 'Показать меньше' : 'Показать все'}
                    </button>
                </div>
                {editingBook && (
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Редактирование книги</h3>
                        <div>
                            <input type="text" name="title" placeholder="Название" value={editingBook.title} onChange={handleEditChange} className="border p-2 mb-2" />
                            <input type="text" name="description" placeholder="Описание" value={editingBook.description} onChange={handleEditChange} className="border p-2 mb-2" />
                            <input type="number" name="price" placeholder="Цена" value={editingBook.price} onChange={handleEditChange} className="border p-2 mb-2" />
                            <input type="number" name="quantity" placeholder="Количество" value={editingBook.quantity} onChange={handleEditChange} className="border p-2 mb-2" />
                            <input type="text" name="image" placeholder="Изображение" value={editingBook.image} onChange={handleEditChange} className="border p-2 mb-2" />
                            <input type="text" name="published_date" placeholder="Дата публикации" value={editingBook.published_date} onChange={handleEditChange} className="border p-2 mb-2" />
                            <div>
                                <input type="checkbox" name="isBestseller" checked={editingBook.isBestseller} onChange={(e) => handleEditChange({ target: { name: 'isBestseller', value: e.target.checked } })} />
                                <label>Бестселлер</label>
                            </div>
                            <select name="author" value={editingBook.author} onChange={handleEditChange} className="border p-2 mb-2">
                                <option value="">Выберите автора</option>
                                {authors.map(author => (
                                    <option key={author._id} value={author._id}>{author.name}</option>
                                ))}
                            </select>
                            <select
                                name="category"
                                value={editingBook.category}
                                onChange={handleCategoryChange}
                                className="border p-2 mb-2"
                            >
                                <option value="">Выберите категорию</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>

                            <select
                                name="subcategory"
                                value={editingBook.subcategory}
                                onChange={handleEditChange}
                                className="border p-2 mb-2"
                            >
                                <option value="">Выберите подкатегорию</option>
                                {subcategories.map(subcategory => (
                                    <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                                ))}
                            </select>
                            <select name="publisher" value={editingBook.publisher} onChange={handleEditChange} className="border p-2 mb-2">
                                <option value="">Выберите издателя</option>
                                {publishers.map(publisher => (
                                    <option key={publisher._id} value={publisher._id}>{publisher.name}</option>
                                ))}
                            </select>
                            <button onClick={() => handleUpdateBook(editingBook._id, editingBook)} className="bg-blue-500 text-white p-2 rounded-lg mt-4">Сохранить</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Books;
